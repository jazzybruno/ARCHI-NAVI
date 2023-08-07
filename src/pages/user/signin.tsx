import type { NextPageWithLayout } from 'next'
import SigninForm from 'components/SigninForm'
import { MainLayout } from 'layouts/main'

const CompanySigninPage: NextPageWithLayout = () => {
   return (
      <>
         <div className='flex items-center justify-center'>
            <SigninForm role='user'></SigninForm>
         </div>
      </>
   )
}

CompanySigninPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default CompanySigninPage
