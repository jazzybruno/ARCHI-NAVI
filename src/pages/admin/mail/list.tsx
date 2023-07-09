import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminMailListPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        一斉メール・LINE配信
      </Title>
    </>
  )
}

AdminMailListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminMailListPage
