import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminCompanyDetailsPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        企業情報詳細
      </Title>
    </>
  )
}

AdminCompanyDetailsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCompanyDetailsPage
