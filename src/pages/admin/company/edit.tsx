import type { NextPageWithLayout } from 'next'
import { AdminLayout } from 'layouts/admin'
import { Typography } from 'antd'
const { Title } = Typography

const AdminCompanyEditPage: NextPageWithLayout = () => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        企業情報変更
      </Title>
    </>
  )
}

AdminCompanyEditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminCompanyEditPage
