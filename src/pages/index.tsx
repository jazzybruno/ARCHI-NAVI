import { format } from 'date-fns'

import type { GetServerSideProps, NextPageWithLayout } from 'next'
import { useEffect, useState } from 'react'
import MySection from 'components/MySection'
import Posts from 'components/Posts'
import { MainLayout } from 'layouts/main'
import { httpClient } from 'services/httpClient'
import {
   RightOutlined,
   ClockCircleOutlined,
   EnvironmentOutlined,
   CreditCardOutlined,
   StarOutlined,
   SwapRightOutlined,
} from '@ant-design/icons'

type Props = {
   title?: string
}

const HomePage: NextPageWithLayout<Props> = (props) => {
   return (
      <>
         <section className='relative'>
            <img className='w-full' src='/images/home/mainvisual-pc.png' alt='Home' />
            <img
               className='absolute start-[50%] top-[70%] w-[33%] translate-x-[-50%]'
               src='/images/home/top-mv-txt-1.svg'
               alt='Home-text'
            />
            <img
               className='absolute start-[50%] top-[77%] w-[33%] translate-x-[-50%] transition-transform duration-300 hover:scale-105'
               src='/images/home/top-mv-register-btn.svg'
               alt='Register-button'
            />
            <a
               href='/signin'
               className='absolute start-[50%] top-[90%] translate-x-[-50%] text-[0.5rem] font-bold text-[#fff] underline transition-transform duration-300 hover:scale-105 md:text-[0.8rem] lg:text-[1.2rem]'
            >
               会員ログイン
            </a>
            <img
               className='absolute bottom-0 w-full bg-repeat'
               src='/images/home/top-mv-bg.png'
               alt='bg-wave'
            />
         </section>
         <section>
            <div className='bg-[url("/images/home/top-bg-wave-1.png")] bg-[length:50px_40px] bg-[center_bottom_2.8rem] bg-no-repeat bg-repeat-x md:bg-[length:100px_80px] md:bg-[center_bottom_3.5rem]'>
               <div className='bg-[url("/images/home/top-bg-ship-1.png")] bg-[length:5rem_6rem] bg-[center_left_100px] bg-no-repeat py-[50px] md:bg-[length:9rem_11rem] md:py-[65px] lg:py-[75px]'>
                  <h2 className='text-center text-[1.2rem] font-black text-[#005bac] md:text-[3rem]'>
                     イベントカレンダー
                     <span className='text-[1rem] text-[#404040] md:text-[2.4rem]'>や</span>{' '}
                     就活記事<span className='text-[1rem] text-[#404040] md:text-[2.4rem]'>で</span>
                     <br />
                     <span className='text-[#404040]'>理想の就職を叶えよう！</span>
                  </h2>
                  <span className='mx-auto mt-[40px] flex w-[180px] justify-center rounded-lg border-[3px] border-[#111] bg-[#fff] px-[18px] py-[10px] text-[12px] text-[#404040] md:w-[350px] md:px-[35px] md:py-[14px] md:text-[22px]'>
                     アチナビでできること。
                  </span>
               </div>
            </div>
            <div className='mx-auto block w-[90%] max-w-[75rem] justify-between md:flex lg:w-[95%]'>
               <div className='mb-[30px] rounded-[16px] bg-[url("/images/home/top-feature-item-bg.png")] px-[10px] py-[15px] text-[1.2rem] font-bold text-[#fff] md:mb-0 md:w-[32%]'>
                  <h4 className='text-shadow py-[15px] text-center text-[20px]'>イベント検索</h4>
                  <div className='min-h-[400px] rounded-[16px] bg-[#fff] p-[20px]'>
                     <img
                        className='w-full py-[15px]'
                        src='/images/home/top-feature-1.png'
                        alt='feature'
                     />
                     <p className='text-[15px] text-[#404040]'>
                        建築系のセミナーやインターン情報が一覧に。
                     </p>
                  </div>
               </div>
               <div className='mb-[30px] rounded-[16px] bg-[url("/images/home/top-feature-item-bg.png")] px-[10px] py-[15px] text-[1.2rem] font-bold text-[#fff] md:mb-0 md:w-[32%]'>
                  <h4 className='text-shadow py-[15px] text-center text-[20px]'>カレンダー</h4>
                  <div className='min-h-[400px] rounded-[16px] bg-[#fff] p-[20px]'>
                     <img
                        className='w-full py-[15px]'
                        src='/images/home/top-feature-2.png'
                        alt='feature'
                     />
                     <p className='text-[15px] text-[#404040]'>
                        お気に入りしたイベントや自分のスケジュールを管理できる！
                     </p>
                  </div>
               </div>
               <div className='mb-[30px] rounded-[16px] bg-[url("/images/home/top-feature-item-bg.png")] px-[10px] py-[15px] text-[1.2rem] font-bold text-[#fff] md:mb-0 md:w-[32%]'>
                  <h4 className='text-shadow py-[15px] text-center text-[20px]'>
                     就活お役立ち記事
                  </h4>
                  <div className='min-h-[400px] rounded-[16px] bg-[#fff] p-[20px]'>
                     <img
                        className='w-full py-[15px]'
                        src='/images/home/top-feature-2.png'
                        alt='feature'
                     />
                     <p className='text-[15px] text-[#404040]'>
                        就活の基本的なノウハウから、建築系に特化した選考対策など、建築系の就活生に本当に役立つ情報が満載。
                     </p>
                  </div>
               </div>
            </div>
            <div className='bg-[url("/images/home/top-bg-wave-2.png")] bg-[length:50px_40px] bg-[center_bottom_2.8rem] bg-no-repeat bg-repeat-x pb-[75px] md:bg-[length:150px_100px] md:bg-[center_bottom_5rem] md:pb-[150px]'>
               <div className='relative bg-[url("/images/home/top-bg-ship-1.png")] bg-[length:6rem_7.5rem] bg-[bottom_left_100px] bg-no-repeat py-[50px] md:bg-[length:12rem_15rem] md:py-[65px] lg:py-[75px]'>
                  <h2 className='text-center text-[1.2rem] font-black text-[#404040] after:absolute after:bottom-[-0.25rem] after:right-[50px] after:block after:h-[15vw] after:max-h-[180px] after:min-h-[100px] after:w-[30%] after:min-w-[200px] after:max-w-[350px] after:bg-[url("/images/home/top-bg-treasure.png")] after:bg-contain after:bg-no-repeat md:text-[3rem]'>
                     あなたの冒険に<br></br>アチナビはきっと役立つ。
                  </h2>
               </div>
            </div>
         </section>
         <section>
            <div className='relative mx-auto w-[90%] max-w-[75rem] justify-between pt-[3rem] before:absolute before:bottom-[-17rem] before:block before:h-[500px] before:w-full before:max-w-[500px] before:bg-[url("/images/home/top-heading-bg.png")] before:bg-contain before:bg-no-repeat lg:w-[95%]'>
               <h2 className='pb-[40px] text-center text-[24px] font-bold text-[#404040]'>
                  コラム・記事<br></br>
                  <span className='text-[34px] font-black'>COLUMN</span>
               </h2>
               <button className='absolute right-0 top-[50%] ms-auto hidden translate-y-[-50%] rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] md:block'>
                  <p className='flex w-[70px] justify-between'>
                     <span>一覧を見る</span>
                     <span className='me-[-10px] flex items-center text-[10px]'>
                        <RightOutlined />
                     </span>
                  </p>
               </button>
            </div>
            <div className='relative bg-[#fafafa] py-[40px]'>
               <div className='mx-auto block w-[90%] max-w-[75rem] justify-between md:flex lg:w-[95%]'>
                  <div className='mx-auto mb-[20px] w-full max-w-[400px] rounded-[8px] border-[2px] md:mb-[0px] md:w-[24%]'>
                     <img src='/images/home/top-feature-1.png' alt='articles' />
                     <p className='bg-[#fff] px-[20px] py-[20px] text-[13px] text-[#404040] md:px-[20px]'>
                        記事のタイトルが入ります記事のタイトルが入ります記事のタイトルが入ります
                     </p>
                  </div>
                  <div className='mx-auto mb-[20px] w-full max-w-[400px] rounded-[8px] border-[2px] md:mb-[0px] md:w-[24%]'>
                     <img src='/images/home/top-feature-1.png' alt='articles' />
                     <p className='bg-[#fff] px-[20px] py-[20px] text-[13px] text-[#404040] md:px-[20px]'>
                        記事のタイトルが入ります記事のタイトルが入ります記事のタイトルが入ります
                     </p>
                  </div>
                  <div className='mx-auto mb-[20px] w-full max-w-[400px] rounded-[8px] border-[2px] md:mb-[0px] md:w-[24%]'>
                     <img src='/images/home/top-feature-1.png' alt='articles' />
                     <p className='bg-[#fff] px-[20px] py-[20px] text-[13px] text-[#404040] md:px-[20px]'>
                        記事のタイトルが入ります記事のタイトルが入ります記事のタイトルが入ります
                     </p>
                  </div>
                  <div className='mx-auto mb-[20px] w-full max-w-[400px] rounded-[8px] border-[2px] md:mb-[0px] md:w-[24%]'>
                     <img src='/images/home/top-feature-1.png' alt='articles' />
                     <p className='bg-[#fff] px-[20px] py-[20px] text-[13px] text-[#404040] md:px-[20px]'>
                        記事のタイトルが入ります記事のタイトルが入ります記事のタイトルが入ります
                     </p>
                  </div>
               </div>
            </div>
         </section>
         <section>
            <div className='relative mx-auto w-[90%] max-w-[75rem] justify-between pt-[8rem] before:absolute before:bottom-[-17rem] before:block before:h-[500px] before:w-full before:max-w-[500px] before:bg-[url("/images/home/top-heading-bg.png")] before:bg-contain before:bg-no-repeat lg:w-[95%]'>
               <h2 className='pb-[40px] text-center text-[24px] font-bold text-[#404040]'>
                  インターン・イベント<br></br>
                  <span className='text-[34px] font-black'>INTERN・IVENT</span>
               </h2>
               <button className='absolute right-0 top-[70%] ms-auto hidden translate-y-[-50%] rounded-[50px] bg-green-700 px-[20px] py-[10px] text-[12.5px] font-bold text-[#fff] duration-500 hover:opacity-[0.5] md:block'>
                  <p className='flex w-[70px] justify-between'>
                     <span>一覧を見る</span>
                     <span className='me-[-10px] flex items-center text-[10px]'>
                        <RightOutlined />
                     </span>
                  </p>
               </button>
            </div>
            <div className='relative bg-[#fafafa] py-[40px] text-[#404040]'>
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
         </section>
         <section>
            <div className='mx-auto my-[100px] block bg-[#F8F5EC] md:flex'>
               <div className='w-full md:w-[50%] md:py-[60px] md:pe-[90px] md:ps-[250px]'>
                  <div className='flex items-center justify-between pb-[50px]'>
                     <div>
                        <p className='text-[13px] text-green-700'>ABOUT</p>
                        <p className='text-[24px] text-[#404040]'>このサイトについて</p>
                     </div>
                     <div className='flex items-center rounded-full bg-green-700 px-[20px] py-[20px] text-[30px] text-[#fff]'>
                        <SwapRightOutlined />
                     </div>
                  </div>
                  <div>
                     <p className='text-[15px] text-[#404040]'>運営の情報も載せる</p>
                  </div>
               </div>
               <img
                  className='w-full md:w-[50%]'
                  src='/images/home/top-about-ist.jpg'
                  alt='about'
               />
            </div>
         </section>
         <section>
            <div className='mx-auto w-[90%] max-w-[75rem] justify-between lg:w-[95%]'>
               <div className='py-[30px]'>
                  <p className='text-[13px] text-green-700'>Q&A</p>
                  <p className='text-[24px] font-bold text-[#404040]'>よくある質問</p>
               </div>
               <div className='mb-[200px]'>
                  <div className='mb-[15px]'>
                     <div className='mb-[3px] flex items-center rounded-t-[10px] bg-green-700 px-[15px] py-[25px]'>
                        <p className='mb-0 me-[12px] rounded-full bg-[#fff] px-[14px] pb-[6px] pt-[2px] text-[24px] text-green-700'>
                           Q
                        </p>
                        <p className='text-[15px] text-[#fff]'>
                           質問が入ります質問が入ります質問が入ります
                        </p>
                     </div>
                     <p className='rounded-b-[10px] border-[1px] border-green-700 px-[15px] py-[25px] text-[15px] text-green-700'>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                  </div>
                  <div className='mb-[15px]'>
                     <div className='mb-[3px] flex items-center rounded-t-[10px] bg-green-700 px-[15px] py-[25px]'>
                        <p className='mb-0 me-[12px] rounded-full bg-[#fff] px-[14px] pb-[6px] pt-[2px] text-[24px] text-green-700'>
                           Q
                        </p>
                        <p className='text-[15px] text-[#fff]'>
                           質問が入ります質問が入ります質問が入ります
                        </p>
                     </div>
                     <p className='rounded-b-[10px] border-[1px] border-green-700 px-[15px] py-[25px] text-[15px] text-green-700'>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                  </div>
                  <div className='mb-[15px]'>
                     <div className='mb-[3px] flex items-center rounded-t-[10px] bg-green-700 px-[15px] py-[25px]'>
                        <p className='mb-0 me-[12px] rounded-full bg-[#fff] px-[14px] pb-[6px] pt-[2px] text-[24px] text-green-700'>
                           Q
                        </p>
                        <p className='text-[15px] text-[#fff]'>
                           質問が入ります質問が入ります質問が入ります
                        </p>
                     </div>
                     <p className='rounded-b-[10px] border-[1px] border-green-700 px-[15px] py-[25px] text-[15px] text-green-700'>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                  </div>
                  <div className='mb-[15px]'>
                     <div className='mb-[3px] flex items-center rounded-t-[10px] bg-green-700 px-[15px] py-[25px]'>
                        <p className='mb-0 me-[12px] rounded-full bg-[#fff] px-[14px] pb-[6px] pt-[2px] text-[24px] text-green-700'>
                           Q
                        </p>
                        <p className='text-[15px] text-[#fff]'>
                           質問が入ります質問が入ります質問が入ります
                        </p>
                     </div>
                     <p className='rounded-b-[10px] border-[1px] border-green-700 px-[15px] py-[25px] text-[15px] text-green-700'>
                        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   // const res = await httpClient().get('api/test')
   const props: Props = {
      title: 'Hello World',
   }

   return {
      props: props,
   }
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
