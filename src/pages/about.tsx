import { HomeOutlined } from '@ant-design/icons'
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

const AboutPage: NextPageWithLayout<Props> = (props) => {
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
                        <span className='flex items-center text-[12px]'>このサイトについて</span>
                     </>
                  ),
               },
            ]}
            className='bg-[#FAFAFA] px-[5%] py-[15px] text-[#404040] lg:px-[10%] lg:py-[30px] xl:px-[100px]'
         />
         <section>
            <div className='bg-[#FAFAFA] pb-[50px] pt-[40px] text-center'>
               <h2 className='text-[16px] font-bold text-green-700'>ABOUT</h2>
               <h2 className='text-[25px] font-bold text-[#404040]'>このサイトについて</h2>
            </div>
            <div className='bg-[#0bc3ff]'>
               <div className='mt-[-1px] border-0 bg-[url("/images/about/about-bg-title.svg")] bg-contain bg-top bg-no-repeat px-[10%] pb-[50px] pt-[130px] lg:px-[130px] lg:pb-[150px] lg:pt-[220px]'>
                  <div className='mx-auto w-[2.5rem] border-[2px] border-green-700'></div>
                  <h3 className='pt-[30px] text-center text-[25px] text-[30px] leading-relaxed text-[#FFF] lg:text-[35px]'>
                     アチナビとは？
                  </h3>
                  <p className='mx-auto mt-[40px] max-w-[810px] text-[15px] leading-relaxed text-[#FFF] lg:text-[20px]'>
                     アチナビは建築系企業への就職を目指す大学生のための情報サイトです。<br></br>
                     長い就職活動を乗り越えるには情報収集が欠かせません。このサイトでは、さまざまな魅力的な機能を提供しています。
                     <br></br>
                     アチナビへの登録は、将来の成功への第一歩です。ぜひ、このサイトに登録して、夢の実現に向けたキャリアの始まりをスタートさせましょう！
                  </p>
               </div>
               <img src='/images/about/about-bg-main.png' alt='' />
            </div>
         </section>
         <section>
            <div className='pt-[60px]'>
               <div className='mx-auto w-[2.5rem] border-[2px] border-green-700'></div>
               <h3 className='pt-[30px] text-center text-[25px] text-[30px] font-bold leading-relaxed text-[#404040] lg:text-[35px]'>
                  運営者について
               </h3>
               <p className='mx-auto mt-[35px] max-w-[1080px] px-[10%] text-[15px] leading-loose text-[#404040] lg:px-[140px] lg:text-[20px]'>
                  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
               </p>
            </div>
            <div className='pt-[60px]'>
               <div className='mx-auto w-[2.5rem] border-[2px] border-green-700'></div>
               <h3 className='pt-[30px] text-center text-[25px] text-[30px] font-bold leading-relaxed text-[#404040] lg:text-[35px]'>
                  運営会社
               </h3>
               <p className='mx-auto mt-[35px] max-w-[1080px] px-[10%] text-[15px] leading-loose text-[#404040] lg:px-[140px] lg:text-[20px]'>
                  HorizonXXは、これまでにない新しいユニークなサービスをご提供いたします。
                  <br />
                  インターネットの登場により、誰もが情報や知識を瞬時に取得することができる世の中になりました。ただ、業界、市場によっては、まだまだ不十分な情報量・内容であったり等、様々な局面で「情報格差」が生まれています。その「情報格差」により、ユーザーからみて不明瞭で便利ではない業界が多く存在するのが現状です。「こんなものがあったらいいのに」「なんでこんな風にできないんだろう」そんな想いを、ユーザー目線で「情報格差」をなくしていきます。既存のインターネットサービスをより使い勝手の良いサービスへ・・・、新たな価値を創造し続けて参ります。イノベーションを起こし、世界にインパクトを与えていくことがHorizonXXの使命です。
               </p>
            </div>
         </section>
         <section>
            <div className='py-[60px]'>
               <div className='mx-auto w-[5rem] border-[2px] border-green-700'></div>
               <h3 className='pt-[30px] text-center text-[25px] text-[30px] font-bold leading-relaxed text-[#404040] lg:text-[35px]'>
                  企業概要
               </h3>
               <div className='mx-auto mt-[35px] max-w-[1080px] px-[10%] xl:px-[0%]'>
                  <img className='mx-auto' src='/images/about/about-img-company.jpg' alt='' />
               </div>
               <div className='pt-[60px]'>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full pb-[0px] ps-[10px] pt-[10px] text-[14px] font-bold lg:w-[40%] lg:py-[16px] lg:ps-[16px]'>
                        運営会社
                     </p>
                     <p className='w-full lg:w-[60%]'>株式会社HorizonXX（ホライズン）</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>代表取締役</p>
                     <p className='w-full lg:w-[60%]'>尾熨斗(おのし) 啓介</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>資本金</p>
                     <p className='w-full lg:w-[60%]'>9,800,000円</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>取引銀行</p>
                     <p className='w-full lg:w-[60%]'>三井住友銀行・第一勧業信用組合</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>電話番号</p>
                     <p className='w-full lg:w-[60%]'>03-5944-8575</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>FAX番号</p>
                     <p className='w-full lg:w-[60%]'>03-5944-8587</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>営業時間</p>
                     <p className='w-full lg:w-[60%]'>平日 9:30～18:30</p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>所在地</p>
                     <p className='w-full lg:w-[60%]'>
                        〒171-0022 東京都豊島区南池袋３丁目１５−１１
                     </p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>所属協会等</p>
                     <p className='w-full lg:w-[60%]'>
                        グリーンビルディングジャパン(GBJ)<br></br>環境不動産普及促進機構 (RE-SEED)
                        <br></br>環境共生住宅推進協議会<br></br>空気調和・衛生工学会<br></br>
                        環境共創イニシアチブ<br></br>住宅性能評価・表示協会
                     </p>
                  </div>
                  <div className='mx-auto block w-[75%] max-w-[810px] border-y p-[20px] lg:flex xl:w-full'>
                     <p className='w-full text-[14px] font-bold lg:w-[40%]'>ZEB受注目標</p>
                     <p className='w-full lg:w-[60%]'>
                        2025年度に自社が受注するコンサルティング業務のうち、ZEBが占める割合を50％以上
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default AboutPage
