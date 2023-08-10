import { Typography, Button, Form, Input, Card, Space, Table, Popconfirm, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography

interface DataType {
   key: React.Key
   name: string
}

const AdminCategoryAddPage: NextPageWithLayout = () => {
   const [dataSource, setDataSource] = useState([])
   const [totalData, setTotalData] = useState(1)
   const [currentPage, setCurrentPage] = useState(1)
   const [loading, setLoading] = useState(false)
   const [modalOpen, setModalOpen] = useState(false)
   const router = useRouter()
   let categoryName

   useEffect(() => {
      fetchData(1)
   }, [])

   const [form] = Form.useForm()
   const [form1] = Form.useForm()

   const fetchData = (page: number) => {
      setLoading(true)

      const queryParams = new URLSearchParams()

      queryParams.set('page', page.toString())

      const queryString = queryParams.toString()

      httpClient()
         .get(`${ApiRoutes.category.index}?${queryString}`)
         .then((res) => {
            setDataSource(res.data.data)
            setTotalData(res.data.total)
            setCurrentPage(page)
         })
         .catch((err) => console.error(err))
      setLoading(false)
   }

   const onFinish = (values: string) => {
      httpClient()
         .post(`${ApiRoutes.category.index}`, values)
         .then(() => {
            fetchData(1)
         })
         .catch((err) => console.error(err))
   }
   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }

   const confirmDelete = (id: number) => {
      setLoading(true)
      httpClient()
         .delete(`${ApiRoutes.category.index}/${id}`)
         .then((_res) => {
            fetchData(currentPage)
         })
         .catch((err) => console.error(err))
   }

   const onModalChange = () => {
      categoryName = form1.getFieldValue('categoryName')
   }

   const goEdit = (categoryName: string, id: number) => {
      const data = {
         name: categoryName,
      }
      httpClient()
         .put(`${ApiRoutes.category.index}/${id}`, data)
         .then(() => {
            setModalOpen(false)
            fetchData(currentPage)
            form1.setFieldsValue({
               categoryName: null,
            })
         })
         .catch((err) => console.error(err))
   }

   const columns: ColumnsType<DataType> = [
      {
         title: 'カテゴリ名',
         dataIndex: 'name',
         key: 'name',
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
                  <Button className='delete-button' type='primary' size='small' danger>
                     削除
                  </Button>
               </Popconfirm>
               <Button type='primary' size='small' onClick={() => setModalOpen(true)}>
                  編集
               </Button>
               <Modal
                  title='カテゴリ名編集'
                  centered
                  open={modalOpen}
                  onOk={() => goEdit(categoryName, record.id)}
                  onCancel={() => setModalOpen(false)}
                  okText='オーケー'
                  cancelText='キャンセル'
               >
                  <Form className='mt-[100px] w-full' form={form1} layout='vertical'>
                     <Form.Item label='カテゴリ名' name='categoryName' wrapperCol={{ span: 24 }}>
                        <Input onChange={onModalChange} />
                     </Form.Item>
                     {/* <Form.Item className='mt-[-56px]' wrapperCol={{ span: 12, offset: 21 }}>
                                <Space>
                                    <Button type='primary' htmlType='submit'>
                                        編集
                                    </Button>
                                </Space>
                            </Form.Item> */}
                  </Form>
               </Modal>
            </Space>
         ),
      },
   ]

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            コラムカテゴリ追加編集
         </Title>
         <Form
            className='mt-[100px] w-full'
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item label='カテゴリ名' name='name' wrapperCol={{ span: 22 }}>
               <Input />
            </Form.Item>
            <Form.Item className='mt-[-56px]' wrapperCol={{ span: 12, offset: 23 }}>
               <Space>
                  <Button type='primary' className='ms-[-50px] w-[100px]' htmlType='submit'>
                     追加
                  </Button>
               </Space>
            </Form.Item>
         </Form>
         <Card>
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
      </>
   )
}

AdminCategoryAddPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCategoryAddPage
