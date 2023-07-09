import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminBlogEditPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        コラム・Blog情報変更
      </Title>
    </>
  )
}

AdminBlogEditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogEditPage
