import { Typography } from 'antd'
import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
const { Title } = Typography

const AdminCompanyListPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        企業情報照会
      </Title>
    </>
  )
}

AdminCompanyListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCompanyListPage
