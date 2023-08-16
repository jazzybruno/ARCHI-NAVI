import {
   HomeOutlined,
   ClockCircleOutlined,
   EnvironmentOutlined,
   CreditCardOutlined,
   StarOutlined,
   RightOutlined,
   GoogleSquareFilled,
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

const EventPage: NextPageWithLayout<Props> = (props) => {
   return (
      <>
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
                        <span className='flex items-center text-[12px]'>
                           インターン・イベント情報一覧
                        </span>
                     </>
                  ),
               },
            ]}
            className='bg-[#FAFAFA] px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'
         />
         <div className='relative mx-auto mb-[20px] w-full px-[5%] py-[15px] font-bold text-[#404040] lg:px-[10%] xl:px-[100px]'>
            <div className='w-full'>
               <p className='text[16px] mb-[20px] mt-[40px] lg:text-[20px]'>
                  地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
               </p>
            </div>
            <div className='my-[15px] flex'>
               <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                  インターン
               </p>
               <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                  インターン
               </p>
            </div>
            <div className='flex flex-wrap text-[13px]'>
               <p className='flex items-center pe-[10px]'>
                  <ClockCircleOutlined className='pe-[5px] text-green-700' />
                  開催日：2023年11月1日（水）～2023年11月20日（月）
               </p>
               <p className='flex items-center pe-[10px]'>
                  <EnvironmentOutlined className='pe-[5px] text-green-700' />
                  会場：東京
               </p>
               <p className='flex items-center'>
                  <CreditCardOutlined className='pe-[5px] text-green-700' />
                  対象職種：ITインフラ
               </p>
            </div>
            <div className='mt-[40px] flex flex-wrap justify-center sm:justify-end'>
               <button className='me-0 mt-[5px] flex h-[40px] w-[180px] items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff] duration-500 hover:opacity-[0.5] sm:me-[10px] sm:mt-0'>
                  <StarOutlined className='pe-[5px] !text-[18px]' />
                  お気に入り登録
               </button>
               <button className='relative mt-[5px] flex h-[40px] w-[180px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                  <span>応募する </span>
                  <span className='absolute end-[10%] flex items-center text-[10px]'>
                     <RightOutlined />
                  </span>
               </button>
            </div>
            <div className='border-b py-[20px]'>
               <a
                  href='http://www.google.com/calendar/event?action=TEMPLATE'
                  target='_blank'
                  className='flex items-center justify-center text-[11px] sm:justify-end'
               >
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='16'
                     height='16'
                     data-name='Layer 1'
                     viewBox='0 0 32 32'
                     id='google-calendar'
                  >
                     <path fill='#4285f4' d='M22,4.5v6H10v11H4V6.5a2.0059,2.0059,0,0,1,2-2Z'></path>
                     <polygon fill='#ea4435' points='22 27.5 22 21.5 28 21.5 22 27.5'></polygon>
                     <rect width='6' height='12' x='22' y='9.5' fill='#ffba00'></rect>
                     <rect
                        width='6'
                        height='12'
                        x='13'
                        y='18.5'
                        fill='#00ac47'
                        transform='rotate(90 16 24.5)'
                     ></rect>
                     <path fill='#0066da' d='M28,6.5v4H22v-6h4A2.0059,2.0059,0,0,1,28,6.5Z'></path>
                     <path fill='#188038' d='M10,21.5v6H6a2.0059,2.0059,0,0,1-2-2v-4Z'></path>
                     <path
                        fill='#4285f4'
                        d='M15.69,17.09c0,.89-.66,1.79-2.15,1.79a3.0026,3.0026,0,0,1-1.52-.39l-.08-.06.29-.82.13.08a2.3554,2.3554,0,0,0,1.17.34,1.191,1.191,0,0,0,.88-.31.8586.8586,0,0,0,.25-.65c-.01-.73-.68-.99-1.31-.99h-.54v-.81h.54c.45,0,1.12-.22,1.12-.82,0-.45-.31-.71-.85-.71a1.8865,1.8865,0,0,0-1.04.34l-.14.1-.28-.79.07-.06a2.834,2.834,0,0,1,1.53-.45c1.19,0,1.72.73,1.72,1.45a1.4369,1.4369,0,0,1-.81,1.3A1.52,1.52,0,0,1,15.69,17.09Z'
                     ></path>
                     <polygon
                        fill='#4285f4'
                        points='18.71 12.98 18.71 18.79 17.73 18.79 17.73 14 16.79 14.51 16.58 13.69 17.95 12.98 18.71 12.98'
                     ></polygon>
                  </svg>
                  このイベントをGoogleカレンダーに登録
               </a>
            </div>
            <p className='absolute start-[5%] top-[15px] bg-[#F63C74] px-[16px] py-[5px] text-[13px] text-[#fff] lg:start-[10%] xl:start-[100px]'>
               PICK UP
            </p>
         </div>
         <section className='px-[5%] xl:px-[100px]'>
            <div className='flex justify-between'>
               <div className='mb-[10px] hidden lg:block lg:w-[25%]'>
                  <div className='mb-[30px] border px-[20px] py-[30px] text-[#404040]'>
                     <img src='/images/articles/top_bg.jpg' alt='' />
                     <h5 className='py-[5px] text-[15px]'>企業名が入る</h5>
                     <p className=''>
                        業種：テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                  </div>
                  <div>
                     <h4 className='mb-[10px] flex items-center text-[#404040]'>
                        <svg
                           className='me-[8px] p-[4px] text-[20px] text-[#fff]'
                           width='30'
                           height='30'
                           viewBox='0 0 24 23'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              d='M1.51562 7.15234C0.785156 6.80859 0.785156 5.73438 1.51562 5.39062L11.5273 0.878906C11.6562 0.792969 11.8281 0.792969 12 0.792969C12.1289 0.792969 12.3008 0.792969 12.4297 0.878906L22.4414 5.39062C23.1719 5.73438 23.1719 6.80859 22.4414 7.15234L12.4297 11.6641C12.1289 11.793 11.8281 11.793 11.5273 11.6641L1.51562 7.15234ZM22.4414 10.9336C23.1719 11.2344 23.1719 12.3086 22.4414 12.6523L12.4297 17.1641C12.1289 17.293 11.8281 17.293 11.5273 17.1641L1.51562 12.6523C0.785156 12.3086 0.785156 11.2344 1.51562 10.9336L4.00781 9.77344L10.9688 12.9531C11.2695 13.082 11.6133 13.168 12 13.168C12.3438 13.168 12.6875 13.082 12.9883 12.9531L19.9492 9.77344L22.4414 10.9336ZM22.4414 16.4336C23.1719 16.7344 23.1719 17.8086 22.4414 18.1523L12.4297 22.6641C12.1289 22.793 11.8281 22.793 11.5273 22.6641L1.51562 18.1523C0.785156 17.8086 0.785156 16.7344 1.51562 16.4336L4.00781 15.2734L10.9688 18.4531C11.2695 18.582 11.6133 18.668 12 18.668C12.3438 18.668 12.6875 18.582 12.9883 18.4531L19.9492 15.2734L22.4414 16.4336Z'
                              fill='#018443'
                           />
                        </svg>
                        この企業の他のイベント
                     </h4>
                  </div>
                  <div className='mx-auto mb-[20px] w-full border-b'>
                     <div>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                     </div>
                     <div className='my-[15px] flex'>
                        <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                           インターン
                        </p>
                        <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                           インターン
                        </p>
                     </div>
                     <div className='mb-[20px] flex flex-wrap text-[13px]'>
                        <p className='flex items-center pe-[10px]'>
                           <ClockCircleOutlined className='pe-[5px]' />
                           開催日：2023年11月1日（水）～2023年11月20日（月）
                        </p>
                        <p className='flex items-center'>
                           <EnvironmentOutlined className='pe-[5px]' />
                           会場：東京
                        </p>
                        <p className='flex items-center'>
                           <CreditCardOutlined className='pe-[5px]' />
                           対象職種：ITインフラ
                        </p>
                     </div>
                  </div>
                  <div className='mx-auto mb-[20px] w-full border-b'>
                     <div>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                     </div>
                     <div className='my-[15px] flex'>
                        <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                           インターン
                        </p>
                        <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                           インターン
                        </p>
                     </div>
                     <div className='mb-[20px] flex flex-wrap text-[13px]'>
                        <p className='flex items-center pe-[10px]'>
                           <ClockCircleOutlined className='pe-[5px]' />
                           開催日：2023年11月1日（水）～2023年11月20日（月）
                        </p>
                        <p className='flex items-center'>
                           <EnvironmentOutlined className='pe-[5px]' />
                           会場：東京
                        </p>
                        <p className='flex items-center'>
                           <CreditCardOutlined className='pe-[5px]' />
                           対象職種：ITインフラ
                        </p>
                     </div>
                  </div>
                  <div className='mx-auto mb-[20px] w-full border-b'>
                     <div>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                     </div>
                     <div className='my-[15px] flex'>
                        <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                           インターン
                        </p>
                        <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                           インターン
                        </p>
                     </div>
                     <div className='mb-[20px] flex flex-wrap text-[13px]'>
                        <p className='flex items-center pe-[10px]'>
                           <ClockCircleOutlined className='pe-[5px]' />
                           開催日：2023年11月1日（水）～2023年11月20日（月）
                        </p>
                        <p className='flex items-center'>
                           <EnvironmentOutlined className='pe-[5px]' />
                           会場：東京
                        </p>
                        <p className='flex items-center'>
                           <CreditCardOutlined className='pe-[5px]' />
                           対象職種：ITインフラ
                        </p>
                     </div>
                  </div>
               </div>
               <div className='w-full lg:w-[72%]'>
                  <img className='w-full' src='/images/event/event-main-visual.png' alt='' />
                  <p className='my-[15px] text-center text-[24px] font-bold text-[#404040]'>
                     募集内容
                  </p>
                  <p className='mb-[40px] text-[15px] font-medium leading-[2] text-[#404040]'>
                     本文が入ります。<br></br>
                     【既卒総合職（本社部門）/在宅勤務可/ミドル・バックへキャリアチェンジ可能/安定経営のソニーフィナンシャルグループ/福利厚生・教育・研修制度◎】
                     <br></br>
                     <br></br>
                     ■以下の日程で休日選考会を実施致します。今後事業拡大に伴い新たなキャリアを形成できる貴重なチャンスです。是非ご応募お待ちしております。〇日時：2023年2月12日(日)〇会場：オンライン〇詳細：9:00～17:30：順次選考（※面接合格者は後日最終面接を実施）※所要時間1時間想定
                     <br></br>
                     <br></br>
                     ■配属先について：今回は本社総合職の採用となります。総合職採用となるため将来的に部署異動があり、様々なキャリアパスが広がっております。以下想定配属先部門・業務になりますが、他部門へ打診させていただく可能性もございます。・営業統轄本部（推進・企画部門）・保険オペレーション本部（保険事務）・内部管理系部門
                     ・営業管理部(ライフプランナー職の人事部門)
                     ・人事部・カスタマーセンター・共創戦略部・経営管理 ・法務・経理、運用管理
                     等※オファー時に想定される配属部門についてはお伝えさせて頂きます。
                  </p>
                  <p className='text-[15px] font-medium leading-[2.2] text-[#404040]'>
                     応募期間：2023年11月11日～2023年12月12日
                  </p>
                  <p className='text-[15px] font-medium leading-[2.2] text-[#404040]'>
                     対象学年：2025年卒
                  </p>
                  <p className='text-[15px] font-medium leading-[2.2] text-[#404040]'>
                     応募条件：2020年4月から2021年3月の間にご卒業見込の方。学部学科、専攻は問いません。
                  </p>
                  <p className='text-[15px] font-medium leading-[2.2] text-[#404040]'>
                     報酬・手当：なし
                  </p>
                  <div className='mb-[50px] flex'>
                     <img src='/images/event/event-slides(1).png' alt='' />
                     <img src='/images/event/event-slides(2).png' alt='' />
                     <img src='/images/event/event-slides(1).png' alt='' />
                  </div>
                  <button className='mx-auto mb-[50px] mt-[5px] flex h-[80px] w-[300px] items-center justify-center rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[20px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] sm:mt-0'>
                     <span>応募する </span>
                     <span className='absolute end-[10%] flex items-center text-[10px]'>
                        <RightOutlined />
                     </span>
                  </button>
               </div>
            </div>
            <div className='border-t px-[10%] py-[20px] lg:px-[140px] lg:pb-[80px] lg:pt-[40px]'>
               <h4 className='text-center text-[20px] font-bold text-[#111]'>
                  株式会社〇〇（企業名）について
               </h4>
               <p className='text-[15px] leading-[1.7] text-[#404040]'>
                  ●ミッション里を楽しむ人を増やす <br></br>
                  ●活動範囲椎葉村を中心とした中山間地域<br></br>
                  ●活動内容1.自治体向け自治体様向けに地域おこし協力隊制度の運用支援や、企業誘致を含む官民連携に関するコンサルティングを提供しています。また、総合計画等の公共計画策定支援を行っています。
               </p>
            </div>
         </section>
         <div className='relative bg-[#fafafa] py-[40px] text-[#404040]'>
            <h4 className='mb-[20px] mt-[30px] text-center text-[20px] font-bold text-[#111]'>
               類似するイベント
            </h4>
            <div className='mx-auto block w-[90%] max-w-[75rem] flex-wrap justify-between md:flex lg:w-[95%]'>
               <div className='mx-auto mb-[20px] w-full max-w-[600px] rounded-[12px] border-[1px] px-[20px] py-[30px] md:w-[48%]'>
                  <div className='flex'>
                     <div className='w-[70%]'>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                        <p className='text-[13px] text-[#737373]'>
                           日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                        </p>
                     </div>
                     <img className='w-[30%]' src='' alt='' />
                  </div>
                  <div className='my-[15px] flex'>
                     <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                     <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                  </div>
                  <div className='flex flex-wrap text-[13px]'>
                     <p className='flex items-center pe-[10px]'>
                        <ClockCircleOutlined className='pe-[5px]' />
                        開催日：2023年11月1日（水）～2023年11月20日（月）
                     </p>
                     <p className='flex items-center'>
                        <EnvironmentOutlined className='pe-[5px]' />
                        会場：東京
                     </p>
                     <p className='flex items-center'>
                        <CreditCardOutlined className='pe-[5px]' />
                        対象職種：ITインフラ
                     </p>
                  </div>
                  <button className='mx-auto mt-[40px] flex items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff]'>
                     <StarOutlined className='pe-[5px] !text-[18px]' />
                     お気に入り登録
                  </button>
               </div>
               <div className='mx-auto mb-[20px] w-full max-w-[600px] rounded-[12px] border-[1px] px-[20px] py-[30px] md:w-[48%]'>
                  <div className='flex'>
                     <div className='w-[70%]'>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                        <p className='text-[13px] text-[#737373]'>
                           日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                        </p>
                     </div>
                     <img className='w-[30%]' src='' alt='' />
                  </div>
                  <div className='my-[15px] flex'>
                     <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                     <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                  </div>
                  <div className='flex flex-wrap text-[13px]'>
                     <p className='flex items-center pe-[10px]'>
                        <ClockCircleOutlined className='pe-[5px]' />
                        開催日：2023年11月1日（水）～2023年11月20日（月）
                     </p>
                     <p className='flex items-center'>
                        <EnvironmentOutlined className='pe-[5px]' />
                        会場：東京
                     </p>
                     <p className='flex items-center'>
                        <CreditCardOutlined className='pe-[5px]' />
                        対象職種：ITインフラ
                     </p>
                  </div>
                  <button className='mx-auto mt-[40px] flex items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff]'>
                     <StarOutlined className='pe-[5px] !text-[18px]' />
                     お気に入り登録
                  </button>
               </div>
               <div className='mx-auto mb-[20px] w-full max-w-[600px] rounded-[12px] border-[1px] px-[20px] py-[30px] md:w-[48%]'>
                  <div className='flex'>
                     <div className='w-[70%]'>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                        <p className='text-[13px] text-[#737373]'>
                           日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                        </p>
                     </div>
                     <img className='w-[30%]' src='' alt='' />
                  </div>
                  <div className='my-[15px] flex'>
                     <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                     <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                  </div>
                  <div className='flex flex-wrap text-[13px]'>
                     <p className='flex items-center pe-[10px]'>
                        <ClockCircleOutlined className='pe-[5px]' />
                        開催日：2023年11月1日（水）～2023年11月20日（月）
                     </p>
                     <p className='flex items-center'>
                        <EnvironmentOutlined className='pe-[5px]' />
                        会場：東京
                     </p>
                     <p className='flex items-center'>
                        <CreditCardOutlined className='pe-[5px]' />
                        対象職種：ITインフラ
                     </p>
                  </div>
                  <button className='mx-auto mt-[40px] flex items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff]'>
                     <StarOutlined className='pe-[5px] !text-[18px]' />
                     お気に入り登録
                  </button>
               </div>
               <div className='mx-auto mb-[20px] w-full max-w-[600px] rounded-[12px] border-[1px] px-[20px] py-[30px] md:w-[48%]'>
                  <div className='flex'>
                     <div className='w-[70%]'>
                        <p className='mb-[20px] text-[15px]'>
                           地方都市だからこそ生まれるイノベーション!最前線のインターンモデルをともに支えるパートナーを募集します。
                        </p>
                        <p className='text-[13px] text-[#737373]'>
                           日本で最も進んだ実践型インターンシップ「ホンキ系インターンシップ」を展開する土台作り、新規プログラム企画に共に挑む右腕を募集します。
                        </p>
                     </div>
                     <img className='w-[30%]' src='' alt='' />
                  </div>
                  <div className='my-[15px] flex'>
                     <p className='me-[10px] rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                     <p className='rounded-[50px] bg-[#F2F7FF] px-[18px] py-[2px] text-[11px]'>
                        インターン
                     </p>
                  </div>
                  <div className='flex flex-wrap text-[13px]'>
                     <p className='flex items-center pe-[10px]'>
                        <ClockCircleOutlined className='pe-[5px]' />
                        開催日：2023年11月1日（水）～2023年11月20日（月）
                     </p>
                     <p className='flex items-center'>
                        <EnvironmentOutlined className='pe-[5px]' />
                        会場：東京
                     </p>
                     <p className='flex items-center'>
                        <CreditCardOutlined className='pe-[5px]' />
                        対象職種：ITインフラ
                     </p>
                  </div>
                  <button className='mx-auto mt-[40px] flex items-center rounded-[50px] bg-[#ff8329] px-[30px] py-[10px] text-[12px] text-[#fff]'>
                     <StarOutlined className='pe-[5px] !text-[18px]' />
                     お気に入り登録
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

EventPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default EventPage
