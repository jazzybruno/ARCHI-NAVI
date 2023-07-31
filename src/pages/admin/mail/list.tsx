import { Typography, Button, DatePicker, Form, Input, Card, Space, Table, Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography
const { RangePicker } = DatePicker

const AdminMailListPage: NextPageWithLayout = () => {
   interface DataType {
      key: React.Key
      title: string
      content: string
      registeredAt: string
   }

   const [dataSource, setDataSource] = useState([]);
   const [totalData, setTotalData] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const [searchForm, setSearchForm] = useState(null);
   const [loading, setLoading] = useState(false);
   const router = useRouter()

   useEffect(() => {
      fetchData(1);
   }, []);

   const [form] = Form.useForm();

   const fetchData = (page: number, values: any = null) => {

      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.set('page', page.toString());
      const queryString = queryParams.toString();
      httpClient().get(`${ApiRoutes.message.index}?${queryString}`)
         .then((res) => {
            setDataSource(res.data.data);
            setTotalData(res.data.total);
            setCurrentPage(page);
         })
         .catch((err) => console.error(err));
      setLoading(false);
   }

   const confirmDelete = (id: number) => {
      setLoading(true);
      httpClient().delete(`${ApiRoutes.message.index}/${id}`)
         .then((_res) => {
            fetchData(currentPage)
         })
         .catch((err) => console.error(err))
   };

   const goEdit = (id: number) => {
      router.push(`/admin/mail/${id}`);
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
                  title="確認"
                  description="このデータを削除してもよろしいですか？"
                  onConfirm={() => confirmDelete(record.id)}
                  okText="はい"
                  cancelText="いいえ"
               >
                  <Button className='delete-button' type='primary' size='small' danger>
                     削除
                  </Button>
               </Popconfirm>
               <Button type='primary' size='small'
                  onClick={() => goEdit(record.id)}
               >
                  編集
               </Button>
            </Space>
         ),
      },
   ]

   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            一斉メール・LINE配信
         </Title>
         <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
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
                        fetchData(page);
                     }
                  }}
               />
            </Card>
         </Space>
      </>
   )
}

AdminMailListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminMailListPage
