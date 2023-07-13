import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminAnnounceListPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        お知らせ照会
      </Title>
    </>
  )
}

AdminAnnounceListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminAnnounceListPage
