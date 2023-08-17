import * as React from 'react'
import styles from 'styles/components/Footer.module.scss'
import { MailOutlined } from '@ant-design/icons'

const Footer = () => {
   return (
      <>
         <div className='border-t py-[30px]'>
            <img className='mx-auto hidden w-[200px] md:block' src='/logo.png' alt='logo' />
            <img className='mx-auto block w-[100px] md:hidden' src='/logo-h.png' alt='logo' />
         </div>
         <div className='bg-[url("/images/footer/footer-bg-sp.jpg")] bg-[length:100%_100%] bg-cover bg-no-repeat px-[10%] pb-[120px] pt-[40px] xl:px-[120px]'>
            <div className='block border-b xl:flex xl:border-b-[0px]'>
               <div className='flex flex-wrap xl:order-2'>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href='#'
                  >
                     HOME
                  </a>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href=''
                  >
                     コラム・記事
                  </a>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href=''
                  >
                     イベント情報
                  </a>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href=''
                  >
                     このサイトについて
                  </a>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href=''
                  >
                     企業の皆様へ
                  </a>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href=''
                  >
                     プライバシーポリシー
                  </a>
                  <a
                     className='me-[0px] w-[50%] pb-[25px] text-[13px] font-black text-[#fff] xl:me-[90px] xl:w-auto'
                     href=''
                  >
                     利用規約
                  </a>
               </div>
               <button className='mx-auto mb-[40px] flex h-[50px] min-w-[250px] items-center justify-center bg-[#FFF] px-[16px] py-[10px] text-[15px] text-green-700 xl:order-1 xl:mb-[0px] xl:me-[60px]'>
                  <MailOutlined className='me-[5px]' />
                  お問い合わせはこちら
               </button>
            </div>
            <div className='xl:justify-inline mt-[30px] flex justify-center pb-[60px] xl:float-right xl:mt-[0px] xl:pb-[100px]'>
               <button className='me-[24px] flex h-[40px] w-[150px] items-center justify-center bg-[#8EC220] text-center text-[13px] font-bold text-[#FFF]'>
                  ユーザーログイン
               </button>
               <button className='flex h-[40px] w-[150px] items-center justify-center bg-[#8EC220] text-center text-[13px] font-bold text-[#FFF]'>
                  企業ログイン
               </button>
            </div>
            <div className='flex w-full justify-center text-[11px] text-[#fff]'>
            Copyright © inspire
            </div>
         </div>
      </>
   )
}

export default Footer
