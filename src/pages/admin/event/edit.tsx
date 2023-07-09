import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminEventEditPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        インターン・イベント情報変更
      </Title>
    </>
  )
}

AdminEventEditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminEventEditPage
