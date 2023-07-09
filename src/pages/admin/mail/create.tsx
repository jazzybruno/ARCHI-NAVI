import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminMailCreatePage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        一斉メール・LINE作成
      </Title>
    </>
  )
}

AdminMailCreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminMailCreatePage
