import type { NextPageWithLayout } from 'next'
import { useState } from 'react'
import SigninForm from 'components/SigninForm'
import { MainLayout } from 'layouts/main'

const SigninPage: NextPageWithLayout = () => {
   const [userRole, setUserRole] = useState('user')

   const onChange = (e: any) => {
      setUserRole(e.target.value)
   }

   const renderSigninForm = () => {
      switch (userRole) {
         case 'user':
            return <SigninForm role='user' />
         case 'company':
            return <SigninForm role='company' />
         case 'admin':
            return <SigninForm role='admin' />
      }
   }

   return (
      <>
         <div className='mx-auto my-[175px] w-[500px]'>
            {renderSigninForm()}
            <p className='mt-[20px] text-[12px]'>最初にユーザーの役割を選択してください。</p>
            <form className='mt-[5px] flex justify-center' onChange={onChange}>
               <div className='px-5'>
                  <label className='pe-2' htmlFor='user'>
                     ユーザー
                  </label>
                  <input
                     type='radio'
                     name='select_userrole'
                     value='user'
                     className='px-2'
                     defaultChecked
                  />
               </div>
               <div className='px-5'>
                  <label className='pe-2' htmlFor='company'>
                     企業
                  </label>
                  <input type='radio' name='select_userrole' value='company' className='px-2' />
               </div>
               <div className='px-5'>
                  <label className='pe-2' htmlFor='admin'>
                     管理者
                  </label>
                  <input type='radio' name='select_userrole' value='admin' className='px-2' />
               </div>
            </form>
         </div>
      </>
   )
}

SigninPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SigninPage
