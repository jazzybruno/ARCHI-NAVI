import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminMailConfirmPage: NextPageWithLayout = () => {
   return (
      <>
         <Title level={2} style={{ textAlign: 'center' }}>
            一斉メール・LINE作成内容確認
         </Title>
      </>
   )
}

AdminMailConfirmPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminMailConfirmPage
