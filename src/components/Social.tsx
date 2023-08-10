import { Button } from 'antd'
import type { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { MainLayout } from 'layouts/main'

const SocialPage: NextPageWithLayout = () => {
   const router = useRouter()

   async function signin(provider: string) {
      // リダイレクト先を指定可能
      router.push(
         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/redirect/${provider}?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/mypage`,
      )
   }

   return (
      <div className='flex items-center justify-center'>
         <div>
            <div>
               <Button
                  className='mb-[10px] mt-[50px] flex h-[40px] w-[340px] items-center justify-center space-x-2 rounded bg-red-500 p-2 font-semibold text-white'
                  onClick={() => signin('google')}
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     aria-hidden='true'
                     role='img'
                     className='w-5'
                     preserveAspectRatio='xMidYMid meet'
                     viewBox='0 0 24 24'
                  >
                     <g fill='none'>
                        <path
                           fillRule='evenodd'
                           clipRule='evenodd'
                           d='M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z'
                           fill='currentColor'
                        />
                     </g>
                  </svg>
                  <span>Googleでログイン</span>
               </Button>
            </div>
            <div>
               <Button
                  className='flex h-[40px] w-[340px] items-center justify-center space-x-2 rounded bg-green-500 p-2 font-semibold text-white'
                  style={{ backgroundColor: '#00b900' }}
                  onClick={() => signin('line')}
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     aria-hidden='true'
                     role='img'
                     className='w-5'
                     preserveAspectRatio='xMidYMid meet'
                     viewBox='0 0 24 24'
                  >
                     <g fill='none'>
                        <path
                           fill={'#FFF'}
                           d='M103.5,54.72c0-19.55-19.6-35.45-43.7-35.45S16.11,35.17,16.11,54.72c0,17.53,15.55,32.21,36.54,35,1.43.31,3.36.94,3.85,2.16a8.93,8.93,0,0,1,.14,4L56,99.55c-.19,1.1-.88,4.32,3.78,2.35S85,87.09,94.13,76.54h0c6.33-7,9.37-14,9.37-21.82'
                        />
                        <path
                           fill={'#00b900'}
                           d='M50.93,45.28H47.86a.85.85,0,0,0-.85.85v19a.85.85,0,0,0,.85.85h3.07a.85.85,0,0,0,.85-.85v-19a.85.85,0,0,0-.85-.85'
                        />
                        <path
                           fill={'#00b900'}
                           d='M72,45.28H69a.85.85,0,0,0-.85.85V57.44L59.38,45.65l-.06-.08h0l-.05-.05h0l0,0,0,0,0,0,0,0,0,0h0l-.05,0h0l-.05,0h-3.3a.85.85,0,0,0-.85.85v19a.85.85,0,0,0,.85.85h3.06a.86.86,0,0,0,.86-.85V53.86l8.73,11.79a.63.63,0,0,0,.22.21h0l.05,0h0l0,0,0,0h0l.06,0h0A.78.78,0,0,0,69,66H72a.85.85,0,0,0,.85-.85v-19a.85.85,0,0,0-.85-.85'
                        />
                        <path
                           fill={'#00b900'}
                           d='M43.54,61.25H35.21V46.13a.85.85,0,0,0-.85-.85H31.3a.85.85,0,0,0-.85.85v19h0a.87.87,0,0,0,.23.59h0v0a.87.87,0,0,0,.59.23H43.54a.85.85,0,0,0,.85-.85V62.1a.85.85,0,0,0-.85-.85'
                        />
                        <path
                           fill={'#00b900'}
                           d='M89,50a.85.85,0,0,0,.85-.85V46.13a.85.85,0,0,0-.85-.85H76.7a.85.85,0,0,0-.59.24h0v0a.83.83,0,0,0-.24.59h0v19h0a.83.83,0,0,0,.24.59h0a.85.85,0,0,0,.59.24H89a.85.85,0,0,0,.85-.85V62.1a.85.85,0,0,0-.85-.85H80.62V58H89a.85.85,0,0,0,.85-.85V54.11a.85.85,0,0,0-.85-.85H80.62V50Z'
                        />
                     </g>
                  </svg>
                  <span>LINEでログイン</span>
               </Button>
            </div>
         </div>
      </div>
   )
}

SocialPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default SocialPage
