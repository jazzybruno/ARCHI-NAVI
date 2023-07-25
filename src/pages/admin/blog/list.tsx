import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
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
