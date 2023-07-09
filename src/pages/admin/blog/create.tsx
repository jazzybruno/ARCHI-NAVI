import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminBlogCreatePage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        コラム・Blog作成
      </Title>
    </>
  )
}

AdminBlogCreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminBlogCreatePage
