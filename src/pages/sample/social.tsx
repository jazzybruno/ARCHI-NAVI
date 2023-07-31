import type { NextPageWithLayout } from 'next'
import { MainLayout } from 'layouts/main'
import { Router, useRouter } from 'next/router'

const SocialPage: NextPageWithLayout = () => {
  const router = useRouter()

  async function signin(provider: string) {
    router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/redirect/${provider}`)
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
