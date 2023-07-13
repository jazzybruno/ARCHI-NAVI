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

interface DataType {
  key: React.Key
  username: string
  email: string
  registeredAt: string
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const AdminUserListPage: NextPageWithLayout = () => {
  const [dataSource, setDataSource] = useState([]);
  const [totalData, setTotalData] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (page: number) => {
    setLoading(true);
    httpClient().get(`${ApiRoutes.user.index}?page=${page}`)
      .then((res) => {
        setDataSource(res.data.data);
        setTotalData(res.data.total);
        setLoading(false);
      })
      .catch((err) => console.error(err))
  }

  const confirmDelete = (id: number) => {
    setLoading(true);
    httpClient().delete(`${ApiRoutes.user.index}/${id}`)
      .then((_res) => {
        fetchData(currentPage)
      })
      .catch((err) => console.error(err))
  };

  const goEdit = (id: number) => {
    router.push(`/admin/user/${id}`);
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: `id`,
    },
    {
      title: 'ユーザー名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
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
            <Button type='primary' size='small' danger>
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
        ユーザー情報照会
      </Title>
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <Card>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            autoComplete='off'
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label='名前' name='username'>
              <Input />
            </Form.Item>

            <Form.Item
              label='メールアドレス'
              name='email'
              rules={[{ type: 'email', message: 'メール形式が正しくありません' }]}
            >
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
              showSizeChanger: false,
              onChange: (page, _pageSize) => {
                fetchData(page);
                setCurrentPage(page);
              }
            }}
          />
        </Card>
      </Space>
    </>
  )
}

AdminUserListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserListPage
