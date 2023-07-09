import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
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
