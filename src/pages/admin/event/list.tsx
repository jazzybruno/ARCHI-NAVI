import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminEventListPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        インターン・イベント情報照会
      </Title>
    </>
  )
}

AdminEventListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminEventListPage
