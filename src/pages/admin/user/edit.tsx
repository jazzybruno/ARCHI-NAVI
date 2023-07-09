import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminUserEditPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        ユーザー情報変更
      </Title>
    </>
  )
}

AdminUserEditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminUserEditPage
