import { Typography, Button, Form, Card, Space, Table, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminLayout } from 'layouts/admin'
import { httpClient } from 'services/httpClient'
import { ApiRoutes } from 'utils/constant'

const { Title } = Typography

const AdminAnnounceListPage: NextPageWithLayout = () => {
   interface DataType {
      key: React.Key
      title: string
      content: string
      dateTime: string
      status: string
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
      httpClient().get(`${ApiRoutes.notification.index}?${queryString}`)
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
      httpClient().delete(`${ApiRoutes.notification.index}/${id}`)
         .then((_res) => {
            fetchData(currentPage)
         })
         .catch((err) => console.error(err))
   };

   const goEdit = (id: number) => {
      router.push(`/admin/announce/${id}`);
   }

   const columns: ColumnsType<DataType> = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: `id`,
         width: '5%'
      },
      {
         title: '件名',
         dataIndex: 'title',
         key: 'title',
         width: '20%'
      },
      {
         title: '本文',
         dataIndex: 'content',
         key: 'content',
         width: '40%'
      },
      {
         title: '送信予定日時',
         dataIndex: 'dateTime',
         key: 'dateTime',
         width: '10%'
      },
      {
         title: 'ステータス',
         dataIndex: 'status',
         key: 'status',
         width: '10%'
      },
      {
         title: 'Action',
         key: 'operation',
         width: '15%',
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
            お知らせ
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

AdminAnnounceListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminAnnounceListPage
