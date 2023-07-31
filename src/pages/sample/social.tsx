import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { MainLayout } from 'layouts/main'

const SocialPage: NextPageWithLayout = () => {
  const router = useRouter()

  async function signin(provider: string) {
    router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/redirect/${provider}?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/mypage`)
  }

  return (
    <div>
      <button onClick={() => signin('line')}>LINE</button>
      <button onClick={() => signin('google')}>Google</button>
    </div>
  )
}

SocialPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SocialPage
