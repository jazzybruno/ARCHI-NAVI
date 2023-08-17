import {
   RightOutlined,
   ClockCircleOutlined,
   EnvironmentOutlined,
   CreditCardOutlined,
   StarOutlined,
   SwapRightOutlined,
   HomeOutlined,
} from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { format } from 'date-fns'
import type { GetServerSideProps, NextPageWithLayout } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MySection from 'components/MySection'
import Posts from 'components/Posts'
import { MainLayout } from 'layouts/main'
import { httpClient } from 'services/httpClient'
import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'

type Props = {
   title?: string
}

const ArticlesPage: NextPageWithLayout<Props> = (props) => {

   const [articlesData, setArticlesData] = useState([])
   const [eventsData, setEventsData] = useState([])

   const fetchData = async () => {
      const responseArticles = await fetch('https://api-stg.archi-navi.com/api/post')
      const dataArticles = await responseArticles.json()
      const getMainDataArticles = dataArticles['data']
      // const sortedDataArticles = getMainDataArticles.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
      const latestDataArticles = getMainDataArticles.slice(0, 4)
      const responseEvents = await fetch('https://api-stg.archi-navi.com/api/event')
      const dataEvents = await responseEvents.json()
      const getMainDataEvents = dataEvents['data']
      // const sortedDataEvents = getMainDataEvents.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
      const latestDataEvents = getMainDataEvents.slice(0, 4)
      setArticlesData(latestDataArticles)
      setEventsData(latestDataEvents)
      console.log(getMainDataArticles)
   }

   useEffect(() => {
      fetchData()
   }, [])
   
   const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
      if (type === 'prev') {
         return <a>Previous</a>
      }
      if (type === 'next') {
         return <a>Next</a>
      }
      return originalElement
   }

   return (
      <>
         <section className='w-full bg-white px-[5%] pt-[15px] text-[#404040] lg:px-[10%] lg:pt-[30px] xl:px-[100px]'>
            <Breadcrumb
               items={[
                  {
                     href: '/',
                     title: (
                        <>
                           <div className='flex text-[#404040] items-center text-[12px] font-bold'>
                              <HomeOutlined className='me-[5px] text-[12px]' />
                              <span className='text-[12px] font-bold'>HOME</span>
                           </div>
                        </>
                     ),
                  },
                  {
                     href: '/about',
                     title: (
                        <>
                           <span className='flex items-center text-[12px] font-bold text-[#404040]'>コラム・記事</span>
                        </>
                     ),
                  },
               ]}
            />
            <h3 className='mt-[20px] text-[12px] font-bold text-green-700 lg:text-[15px]'>
               COLUMN
            </h3>
            <h3 className='border-b pb-[15px] text-[22.5px] font-bold lg:pb-[30px] lg:text-[27px]'>
               コラム・記事
            </h3>
         </section>
         <section className='mt-[40px] w-full bg-white px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'>
            <div className='flex flex-row justify-between md:flex-row md:justify-between sm:flex-col sm:justify-center msm:flex-col msm:justify-center'>
               <div className='flex  max-w-[342px] flex-col rounded-lg p-[10px] shadow-md shadow-gray-300 '>
                  <img className='w-full' src='/images/articles/card.jpg' alt='' />
                  <div>
                     <p className='mb-1 mt-2 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                     カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                     コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block px-2 py-1 text-[12px] '>
                     テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[342px] flex-col rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='w-full' src='/images/articles/card.jpg' alt='' />
                  <div>
                     <p className='mb-1 mt-2 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block px-2 py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[342px] flex-col rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='w-full' src='/images/articles/card.jpg' alt='' />
                  <div>
                     <p className='mb-1 mt-2 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block px-2 py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
            </div>
            <div className='mt-[24px] grid grid-cols-2 place-items-center gap-x-[24px] gap-y-[40px]'>
            <div className='mt-4 grid sm:grid-cols-2 place-items-center sm:flex sm:flex-row sm:space-x-4'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
                     <p className='mb-1 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
                     <p className='mb-1 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
                     <p className='mb-1 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
                     <p className='mb-1 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
                     <p className='mb-1 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
                     <p className='mb-1 w-[70px] bg-[#F2F7FF] px-[6px] py-[4px] text-center text-[11px] font-bold'>
                        カテゴリー
                     </p>
                     <h4 className='text-[15px] font-bold text-[#404040] '>
                        コラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトルコラムタイトル
                     </h4>
                     <p className='block py-1 text-[12px] '>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                     <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                     <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                        タグ
                     </button>
                  </div>
               </div>
            </div>
            <Pagination
               total={50}
               itemRender={itemRender}
               defaultCurrent={2}
               className='mt-5 flex justify-center'
               responsive={true}
            ></Pagination>
         </section>
      </>
   )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     // const res = await httpClient().get('api /test')
//     const props: Props = {
//         title: 'Hello World',
//     }

//     return {
//         props: props,
//     }
// }

ArticlesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ArticlesPage
