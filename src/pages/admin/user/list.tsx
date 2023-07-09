import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminUserListPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        ユーザー情報照会
      </Title>
    </>
  )
}

AdminUserListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserListPage
