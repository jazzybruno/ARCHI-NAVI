import * as React from 'react'
import styles from 'styles/components/Footer.module.scss'
import { MailOutlined } from '@ant-design/icons'

const Footer = () => {
   return (
      <>
         <div className='py-[30px] border-t'>
            <img className='mx-auto w-[200px] md:block hidden' src="/logo.png" alt="logo" />
            <img className='mx-auto w-[100px] md:hidden block' src="/logo-h.png" alt="logo" />
         </div>
         <div className='bg-[url("/images/footer/footer-bg-sp.jpg")] bg-[length:100%_100%] bg-cover bg-no-repeat xl:px-[120px] pt-[40px] pb-[120px] px-[10%]'>
            <div className='xl:flex block border-b xl:border-b-[0px]'>
               <div className='flex flex-wrap xl:order-2'>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="#">HOME</a>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="">コラム・記事</a>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="">イベント情報</a>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="">このサイトについて</a>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="">企業の皆様へ</a>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="">プライバシーポリシー</a>
                  <a className='xl:me-[90px] me-[0px] w-[50%] xl:w-auto text-[13px] text-[#fff] font-black pb-[25px]' href="">利用規約</a>
               </div>
               <button className='flex items-center xl:order-1 mx-auto px-[16px] py-[10px] bg-[#FFF] text-green-700 text-[15px] min-w-[250px] justify-center xl:me-[60px] h-[50px] mb-[40px] xl:mb-[0px]'><MailOutlined className='me-[5px]' />お問い合わせはこちら</button>
            </div>
            <div className='flex xl:float-right justify-center xl:justify-inline mt-[30px] xl:mt-[0px] pb-[60px] xl:pb-[100px]'>
               <button className='bg-[#8EC220] text-[#FFF] text-[13px] font-bold w-[150px] h-[40px] text-center flex items-center justify-center me-[24px]'>ユーザーログイン</button>
               <button className='bg-[#8EC220] text-[#FFF] text-[13px] font-bold w-[150px] h-[40px] text-center flex items-center justify-center'>企業ログイン</button>
            </div>
            <div className='flex justify-center w-full text-[#fff] text-[11px]'>Copyright xxxxxxxxx</div>
         </div>
      </>
   )
}

export default Footer
