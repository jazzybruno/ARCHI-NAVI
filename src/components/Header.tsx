import Link from 'next/link'
import Router from 'next/router'
import * as React from 'react'
import { useMe } from 'hooks/auth'
import { httpClient } from 'services/httpClient'
import styles from 'styles/components/Header.module.scss'
import { ApiRoutes } from 'utils/constant'

const Header = () => {
   const { data: user, error } = useMe()

   const signout = async () => {
      try {
         await httpClient().post(ApiRoutes.auth.signout)
      } catch (error) {
         console.log(error)
      } finally {
         Router.push('/')
      }
   }
   // const handleSelectChange = (e: any) => {
   //    const selectedOption = e.target.value;
   //    Router.push(`/${selectedOption}/signin`);
   // }

   return (
      <div className={`${styles.header} !h-[80px]`}>
         <div className={styles.logo}>
            <Link href='/'>
               <img src='/logo.png' alt='Logo' className='w-[4.3rem] md:w-[12.7rem]'></img>
            </Link>
         </div>
         <div className={styles.actions}>
            {user ? (
               <div>
                  <Link className={styles.action} href='/about-for-business'>
                     &gt; 企業の皆様へ
                  </Link>
                  <Link
                     className={styles.action}
                     href={user.role === 'admin' ? '/admin' : '/mypage'}
                  >
                     マイページ
                  </Link>
                  <button className={styles.action} onClick={signout}>
                     ログアウト
                  </button>
               </div>
            ) : (
               <div className='flex items-center'>
                  {/* <select className='select-bg px-2 py-2 text-center' onChange={handleSelectChange}>
                     <option className='p-1 text-center' value="user">ユーザーログイン</option>
                     <option className='p-1 text-center' value="company">企業ログイン</option>
                     <option className='p-1 text-center' value="admin">管理者ログイン</option>
                  </select> */}
                  <Link
                     className={`${styles.action} transition-color hidden text-[0.866rem] text-[#404040] duration-500 hover:text-[#a6a6a6] lg:block`}
                     href='/about-for-business'
                  >
                     &gt; 企業の皆様へ
                  </Link>
                  <Link
                     className={`${styles.action} flex bg-green-700 px-[15px] py-[7.5px] text-[0.866rem] text-[#fff] transition-opacity duration-500 hover:opacity-[0.6]`}
                     href='/signin'
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-6 w-6'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                        />
                     </svg>
                     <p className='ms-1'>無料会員登録</p>
                  </Link>
                  <Link
                     className={`${styles.action} flex bg-blue-700 px-[15px] py-[7.5px] text-[0.866rem] text-[#fff] transition-opacity duration-500 hover:opacity-[0.6]`}
                     href='/signup'
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-6 w-6'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                        />
                     </svg>
                     <p className='ms-1'>新規登録</p>
                  </Link>
               </div>
            )}
         </div>
         {/* <div className='ms-auto mt-[70px]'>
            <a href="#">HOME</a>
            <a href="/articles">コラム・記事</a>
            <a href="/events">インターン・イベント情報</a>
            <a href="/about">このサイトについて</a>
         </div> */}
      </div>
   )
}

export default Header
