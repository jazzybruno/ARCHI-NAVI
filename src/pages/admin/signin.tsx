import type { NextPageWithLayout } from 'next'
import SigninForm from 'components/SigninForm'
import { MainLayout } from 'layouts/main'

const AdminSigninPage: NextPageWithLayout = () => {
   return (
      <>
         <div className='flex items-center justify-center'>
            <SigninForm role='admin'></SigninForm>
         </div>
      </>
   )
}

AdminSigninPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default AdminSigninPage
