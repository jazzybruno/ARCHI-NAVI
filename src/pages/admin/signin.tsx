import type { NextPageWithLayout } from 'next'
import SigninForm from 'components/SigninForm'
import { AdminLayout } from 'layouts/admin'

const AdminSigninPage: NextPageWithLayout = () => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <SigninForm role='admin'></SigninForm>
      </div>
    </>
  )
}

AdminSigninPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminSigninPage
