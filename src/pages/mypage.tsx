import type { NextPageWithLayout } from 'next'
import { MainLayout } from 'layouts/main'
import MySection from 'components/MySection'

const MyPage: NextPageWithLayout = () => {
  return (
    <>
      <MySection></MySection>
    </>
  )
}

MyPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default MyPage
