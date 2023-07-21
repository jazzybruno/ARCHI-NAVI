import type { NextPageWithLayout } from 'next'
import SigninForm from 'components/SigninForm'
import { AdminLayout } from 'layouts/admin'

const CompanySigninPage: NextPageWithLayout = () => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <SigninForm role='company'></SigninForm>
      </div>
    </>
  )
}

CompanySigninPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default CompanySigninPage
