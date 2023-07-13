import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminEventDetailsPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        インターン・イベント情報詳細
      </Title>
    </>
  )
}

AdminEventDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminEventDetailsPage
