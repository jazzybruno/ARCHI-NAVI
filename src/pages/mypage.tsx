import type { NextPageWithLayout } from 'next'
import MySection from 'components/MySection'
import { MainLayout } from 'layouts/main'

const MyPage: NextPageWithLayout = () => {
  return (
    <>
      <MySection></MySection>
    </>
  )
}

MyPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default MyPage
