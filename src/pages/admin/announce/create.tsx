import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminAnnounceCreatePage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        お知らせ作成
      </Title>
    </>
  )
}

AdminAnnounceCreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminAnnounceCreatePage
