import {
   Typography,
   Button,
   DatePicker,
   Form,
   Input,
   Card,
   Space,
   Table,
   Popconfirm,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography
const { RangePicker } = DatePicker

interface DataType {
   key: React.Key
   title: string
   content: string
   registeredAt: string
}

const AdminBlogListPage: NextPageWithLayout = () => {
   const [dataSource, setDataSource] = useState([])
   const [totalData, setTotalData] = useState(1)
   const [currentPage, setCurrentPage] = useState(1)
   const [loading, setLoading] = useState(false)
   const router = useRouter()

   useEffect(() => {
      fetchData(1)
   }, [])

   const [form] = Form.useForm()

   const fetchData = (page: number, values: any = null) => {

      setLoading(true)

      const queryParams = new URLSearchParams()

      console.log(values)

      if (values) {
         if (values.title) {
            queryParams.append('title', values.title)
         }
         if (values.content) {
            queryParams.append('description', values.content)
         }
         if (values.registeredAt) {
            const [start, end] = values.registeredAt
            queryParams.append('start_date', start.format('YYYY-MM-DD'))
            queryParams.append('end_date', end.format('YYYY-MM-DD'))
         }
      }

      queryParams.set('page', page.toString())


      const queryString = queryParams.toString()


      httpClient()
         .get(`${ApiRoutes.post.index}?${queryString}`)
         .then((res) => {
            setDataSource(res.data.data)
            setTotalData(res.data.total)
            setCurrentPage(page)
         })
         .catch((err) => console.error(err))
      setLoading(false)
   }

   const onFinish = (values: any) => {
      fetchData(1, values)
   }

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   const confirmDelete = (id: number) => {
      setLoading(true)
      httpClient()
         .delete(`${ApiRoutes.post.index}/${id}`)
         .then((_res) => {
            fetchData(currentPage)
         })
         .catch((err) => console.error(err))
   }

   const goEdit = (id: number) => {
      router.push(`/admin/post/${id}`)
   }

   const columns: ColumnsType<DataType> = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: `id`,
      },
      {
         title: 'タイトル',
         dataIndex: 'title',
         key: 'title',
      },
      {
         title: 'コンテンツ',
         dataIndex: 'content',
         key: 'content',
      },
      {
         title: '登録日',
         dataIndex: 'createdAt',
         key: 'createdAt',
      },
      {
         title: 'Action',
         key: 'operation',
         width: 160,
         render: (record) => (
            <Space>
               <Popconfirm
                  title='確認'
                  description='このデータを削除してもよろしいですか？'
                  onConfirm={() => confirmDelete(record.id)}
                  okText='はい'
                  cancelText='いいえ'
               >
                  <Button type='primary' size='small' danger>
                     削除
                  </Button>
               </Popconfirm>
               <Button type='primary' size='small' onClick={() => goEdit(record.id)}>
                  編集
               </Button>
            </Space>
         ),
      },
   ]

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            コラム・Blog情報照会
         </Title>
         <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Card>
               <Form
                  form={form}
                  name='basic'
                  initialValues={{ remember: true }}
                  autoComplete='off'
                  layout='vertical'
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
               >
                  <Form.Item label='タイトル' name='title'>
                     <Input />
                  </Form.Item>

                  <Form.Item label='コンテンツ' name='content'>
                     <Input />
                  </Form.Item>

                  <Form.Item label='登録日' name='registeredAt'>
                     <RangePicker />
                  </Form.Item>

                  <Form.Item>
                     <Button type='primary' htmlType='submit'>
                        この条件で検索
                     </Button>
                  </Form.Item>
               </Form>
            </Card>
            <Card>
               <Title level={3} style={{ textAlign: 'center' }}>
                  会員情報一覧
               </Title>
               <Table
                  loading={loading}
                  columns={columns}
                  dataSource={dataSource}
                  tableLayout='auto'
                  scroll={{ x: 800 }}
                  rowKey='id'
                  pagination={{
                     total: totalData,
                     defaultPageSize: 10,
                     current: currentPage,
                     showSizeChanger: false,
                     onChange: (page, _pageSize) => {
                        fetchData(page)
                     },
                  }}
               />
            </Card>
         </Space>
      </>
   )
}

AdminBlogListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogListPage
