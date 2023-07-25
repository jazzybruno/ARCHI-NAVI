import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
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
