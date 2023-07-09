import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminBlogListPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        コラム・Blog情報照会
      </Title>
    </>
  )
}

AdminBlogListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogListPage
