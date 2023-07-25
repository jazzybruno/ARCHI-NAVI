import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminDashboardPage: NextPageWithLayout = () => {
   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            ダッシュボード
         </Title>
      </>
   )
}

AdminDashboardPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminDashboardPage
