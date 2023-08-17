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

type Props = {
   title?: string
}

const ArticlesPage: NextPageWithLayout<Props> = (props) => {
   return (
      <>
         <div className='w-full bg-white px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'>
            <Breadcrumb
               items={[
                  {
                     href: '/',
                     title: (
                        <>
                           <div className='flex items-center text-[12px]'>
                              <HomeOutlined className='me-[5px] text-[12px]' />
                              <span className='text-[12px]'>HOME</span>
                           </div>
                        </>
                     ),
                  },
                  {
                     href: '/about',
                     title: (
                        <>
                           <span className='flex items-center text-[12px]'>コラム・記事</span>
                        </>
                     ),
                  },
               ]}
            />
            <h3 className='mt-[20px] text-[12px] font-bold text-green-700 lg:text-[15px]'>
               COLUMN
            </h3>
            <h3 className='text-[22.5px] font-bold lg:text-[27px]'>コラム・記事</h3>
         </div>
         <div className='flex w-full flex-col items-center bg-[#FAFAFA] px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'>
            <div className='mx-auto mb-[24px] w-[75%] max-w-[810px] flex-col rounded-sm border-y p-[20px] shadow-md shadow-gray-300 lg:flex xl:w-full'>
               <div className='flex w-full flex-row items-center justify-between'>
                  <span className='text-[13px]'>2021.10.29</span>
                  <span className='text-[13px] bg-blue-100 p-2 font-bold text-gray-700'>カテゴリー</span>
               </div>
               <div className='mt-[17px]'>
                  <h2 className='mb-[20px] block text-left text-[24px] font-bold'>
                     コラムタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル
                  </h2>
                  <button className='round-lg h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                     タグ
                  </button>
                  <button className='round-lg ml-4 h-[23px] w-[78px] rounded-lg bg-[#E4ECD3] px-3 py-1 text-[11px]'>
                     タグ
                  </button>
               </div>
               <img className='mt-[20px]' src='/images/articles/top_bg.jpg' alt='' />
               <p className='mt-[80px] text-[16px] leading-5'>
                  臨床研究専門のCROであるメビックス株式会社（以下、メビックス）。この領域では国内No.1の実績を誇るCROだ。
                  <br />
                  <br />
                  しかし、特に企業治験のCRAの方々には、その「臨床研究」について十分に知られてないという実態がある。そこで今回、その「臨床研究とは」というところから、お話をいただいた。
                  <br />
                  <br />
                  治験だけでは、臨床実態下での使用に耐えうるデータがそろっていないことが多く、その不足するエビデンスを確立することで、真に患者さんの役に立つ医薬品に育てていく「育薬」と、その「育薬」のなかで大きな役割を占める「臨床研究」について、わかりやすくご説明いただいたので、ぜひお読みいただきたい。
               </p>
               <h3 className='mt-[60px] block text-left text-[24px] font-bold'>
                  I．臨床研究の本質的な目的と意義 ～治験データと臨床実態のギャップを埋める～
               </h3>
               <p className='mt-[24px]'>
                  インタビュイー：村林 裕貴 様<br />
                  メビックス株式会社 執行役員 研究推進本部長 研究統括責任者
                  <br />
                  <br />
                  内資系製薬企業で臨床開発職を経験し、企業治験を主体としている
                  CROへ転職。リーダーおよびマネジメントを経験した後、2015年にメビックス株式会社へ転職。以降、プロジェクトマネジャー、教育責任者等の役割を経て2020年から現職。
               </p>
            </div>
            <button className='bg-white font-bold round round-lg mx-auto rounded-full border border-green-700 px-[60px] py-[13px] text-[17px] text-green-700'>
               一覧へ戻る
            </button>
         </div>
         <div className='mt-[40px] w-full bg-white px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'>
            <h3 className='text-center text-[20px] font-bold text-black'>関連するコラム</h3>
            <div className='mt-[24px] grid grid-cols-2 place-items-center gap-x-[24px] gap-y-[40px]'>
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
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
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
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
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
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
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
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
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
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
               <div className='flex max-w-[518px] flex-row rounded-lg p-[10px] shadow-md shadow-gray-300'>
                  <img className='h-[140px] w-[204px]' src='/images/articles/card.jpg' alt='' />
                  <div className='mx-[16px]'>
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
         </div>
         <div className='mt-[144px]  bg-[#F7F9F4] py-[49px]'>
            <div className='mx-auto w-[648px] rounded-lg bg-white shadow-md p-[32px] p-[32px] text-center '>
               <h4 className='text-[15px] text-[#018443]'>建築系専門だから強い！</h4>
               <h2 className='mt-[24px] text-[24px] font-bold text-[#066435]'>
                  アチナビで就活が楽になる
               </h2>
               <p className='mx-auto mt-[24px] max-w-[446px] text-[13px] text-[#404040]'>
                  アチナビ会員登録でインターンやセミナーなどのイベント情報をゲット！
                  マイページのカレンダーでは自分の予定と一緒にスケジュールが管理できます。
               </p>
               <p className='mx-auto mt-[24px] flex flex-row items-center justify-center text-[#F63C74]'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='15'
                     height='16'
                     viewBox='0 0 18 19'
                     fill='none'
                  >
                     <path d='M17.4999 17.8959L0.529297 0.925293' stroke='#F63C74' />
                  </svg>
                  <span className='mx-[8px] text-[15px]'>最短1分で登録完了</span>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='15'
                     height='16'
                     viewBox='0 0 18 19'
                     fill='none'
                  >
                     <path d='M0.500141 17.8959L17.4707 0.925293' stroke='#F63C74' />
                  </svg>
               </p>
               <button className='relative mt-[12px] w-[264px] rounded-full bg-[#F63C74] py-[16px] text-[15px] text-white'>
                  登録する
                  <svg
                     className='absolute right-[10px] top-[50%] translate-y-[-50%]'
                     xmlns='http://www.w3.org/2000/svg'
                     width='15'
                     height='15'
                     viewBox='0 0 10 10'
                     fill='none'
                  >
                     <g clip-path='url(#clip0_702_7412)'>
                        <path
                           d='M7.37367 4.53053C7.58258 4.73943 7.58258 5.07724 7.37367 5.28392L3.10664 9.55318C2.89773 9.76209 2.55992 9.76209 2.35324 9.55318C2.14655 9.34428 2.14433 9.00647 2.35324 8.79978L6.24247 4.91056L2.35102 1.01911C2.14211 0.810203 2.14211 0.472396 2.35102 0.265711C2.55992 0.0590266 2.89773 0.0568042 3.10441 0.265711L7.37367 4.53053Z'
                           fill='white'
                        />
                     </g>
                     <defs>
                        <clipPath id='clip0_702_7412'>
                           <rect
                              width='9.6'
                              height='9.6'
                              fill='white'
                              transform='translate(0.0625 0.109863)'
                           />
                        </clipPath>
                     </defs>
                  </svg>
               </button>
            </div>
         </div>
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
