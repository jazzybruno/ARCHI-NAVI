import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminUserDetailsPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        ユーザー情報詳細
      </Title>
    </>
  )
}

AdminUserDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserDetailsPage
