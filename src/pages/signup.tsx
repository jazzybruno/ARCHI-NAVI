import type { NextPageWithLayout } from 'next'
import { MainLayout } from 'layouts/main'

const SignupPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>新規登録</h1>
    </>
  )
}

SignupPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SignupPage
