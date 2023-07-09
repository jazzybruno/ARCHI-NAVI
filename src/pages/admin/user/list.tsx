import { Typography, Button, DatePicker, Form, Input, Card, Space, Table, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'

const { Title } = Typography
const { RangePicker } = DatePicker

interface DataType {
  key: React.Key
  username: string
  email: string
  registeredAt: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'ユーザー名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'メールアドレス',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '登録日',
    dataIndex: 'registeredAt',
    key: 'registeredAt',
  },
  {
    title: 'Action',
    key: 'operation',
    width: 160,
    render: () => (
      <Space>
        <Button type='primary' size='small' danger>
          削除
        </Button>
        <Button type='primary' size='small'>
          編集
        </Button>
      </Space>
    ),
  },
]

const data: DataType[] = []

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    username: `佐藤俊介 ${i}`,
    email: 'test@example.com',
    registeredAt: '2023-03-05',
  })
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const AdminUserListPage: NextPageWithLayout = () => {
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
          <Table columns={columns} dataSource={data} tableLayout='auto' scroll={{ x: 800 }} />
        </Card>
      </Space>
    </>
  )
}

AdminUserListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserListPage
