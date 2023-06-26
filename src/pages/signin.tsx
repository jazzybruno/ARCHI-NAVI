import type { NextPageWithLayout } from 'next'
import { MainLayout } from 'layouts/main'

const SigninPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>会員ログイン</h1>
    </>
  )
}

SigninPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SigninPage
