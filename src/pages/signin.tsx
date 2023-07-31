import type { NextPageWithLayout } from 'next'
import { useState } from 'react'
import SigninForm from 'components/SigninForm'
import { MainLayout } from 'layouts/main'

const SigninPage: NextPageWithLayout = () => {

   const [role, setRole] = useState(String);

   return (
      <>
         <div className='flex items-center justify-center'>
            <SigninForm role='admin'></SigninForm>
         </div>
      </>
   )
}

SigninPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SigninPage
