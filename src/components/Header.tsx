import Link from 'next/link'
import Router from 'next/router'
import * as React from 'react'
import { useMe } from 'hooks/auth'
import { httpClient } from 'services/httpClient'
import styles from 'styles/components/Header.module.scss'
import { ApiRoutes } from 'utils/constant'

const Header = () => {
   const { data: user, error } = useMe()
   const [displayFlag, setDisplayFlag] = React.useState(true)
   const [screenWidth, setScreenWidth] = React.useState(0)
   const signout = async () => {
      try {
         await httpClient().post(ApiRoutes.auth.signout)
      } catch (error) {
         console.log(error)
      } finally {
         Router.push('/')
      }
   }

   React.useEffect(() => {
      const handleResize = () => {
         setScreenWidth(window.innerWidth)
      }

      // Add event listener to update screen width on resize
      window.addEventListener('resize', handleResize)

      // Initial screen width
      setScreenWidth(window.innerWidth)

      // Clean up event listener on component unmount
      if (window.innerWidth <= 1040) setDisplayFlag(false)
      else setDisplayFlag(true)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [screenWidth])
   return (
      <div>
         <div className='z-10 mt-3 flex justify-between'>
            <Link className='z-10 flex items-center justify-center lg:justify-start' href='/'>
               <img src='/logo.png' alt='Logo' className='hidden w-[12.7rem] lg:block'></img>
               <img src='/logo-h.png' alt='Logo' className='block w-[4.3rem] lg:hidden' />
            </Link>
            {!displayFlag && (
               <div className='flex flex-row items-end'>
                  <div className='flex flex-col'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='26'
                        viewBox='0 0 25 26'
                        fill='none'
                     >
                        <path
                           d='M20.5241 5.3478L20.9706 5.79428C21.4318 6.25551 21.4318 7.00455 20.9706 7.46578L19.9854 8.45097L17.8674 6.333L18.8526 5.3478C19.3138 4.88657 20.0629 4.88657 20.5241 5.3478ZM10.7238 13.4766L17.0335 7.1669L19.1515 9.28488L12.8418 15.5945C12.6868 15.7495 12.4876 15.8602 12.2736 15.9119L9.85302 16.469L10.4102 14.0448C10.4582 13.8308 10.5689 13.6315 10.7275 13.4766H10.7238ZM18.0187 4.51021L9.88992 12.6426C9.57628 12.9563 9.35858 13.3511 9.25895 13.7828L8.48777 17.1258C8.4435 17.3251 8.50253 17.5317 8.64644 17.6756C8.79034 17.8195 8.99697 17.8786 9.19623 17.8343L12.5392 17.0631C12.9709 16.9635 13.3658 16.7458 13.6794 16.4321L21.8082 8.29969C22.7306 7.37722 22.7306 5.88283 21.8082 4.96037L21.3617 4.51021C20.4392 3.58774 18.9448 3.58774 18.0224 4.51021H18.0187ZM6.70188 6.03781C5.07097 6.03781 3.75 7.35878 3.75 8.98969V19.6165C3.75 21.2474 5.07097 22.5684 6.70188 22.5684H17.3287C18.9596 22.5684 20.2806 21.2474 20.2806 19.6165V14.8935C20.2806 14.5688 20.0149 14.3031 19.6902 14.3031C19.3655 14.3031 19.0998 14.5688 19.0998 14.8935V19.6165C19.0998 20.5943 18.3065 21.3876 17.3287 21.3876H6.70188C5.72407 21.3876 4.93075 20.5943 4.93075 19.6165V8.98969C4.93075 8.01188 5.72407 7.21856 6.70188 7.21856H11.4249C11.7496 7.21856 12.0153 6.95289 12.0153 6.62818C12.0153 6.30348 11.7496 6.03781 11.4249 6.03781H6.70188Z'
                           fill='#066435'
                        />
                     </svg>
                     <p className='mt-[5px] text-xs'>登録</p>
                  </div>
                  <div
                     className='ml-[15px] flex cursor-pointer flex-col items-center'
                     onClick={() => setDisplayFlag(true)}
                  >
                     <span className='flex flex-col'>
                        <i className='mb-[6px] h-[2px] w-[20px] bg-green-700'></i>
                        <i className='mb-[6px] h-[2px] w-[20px] bg-green-700'></i>
                        <i className='h-[2px] w-[20px] bg-green-700'></i>
                     </span>
                     <p className='mt-[8px] text-xs'>メニュー</p>
                  </div>
               </div>
            )}
            {displayFlag && (
               <div className='z-10 flex flex-col-reverse justify-end bg-white lg:flex-col'>
                  <div className='w-full'>
                     <div className=''>
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
                           <div className='flex items-center justify-end'>
                              <Link
                                 className={`${styles.action} transition-color mx-3 hidden text-[0.866rem] text-[#404040] duration-500 hover:text-[#a6a6a6] lg:block`}
                                 href='/about-for-business'
                              >
                                 &gt; 企業の皆様へ
                              </Link>
                              <Link
                                 className={`${styles.action} mx-3 flex bg-green-700 px-[15px] py-[7.5px] text-[0.866rem] text-[#fff] transition-opacity duration-500 hover:opacity-[0.6]`}
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
                                 className={`${styles.action} mx-3 flex bg-blue-700 px-[15px] py-[7.5px] text-[0.866rem] text-[#fff] transition-opacity duration-500 hover:opacity-[0.6]`}
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
                  </div>
                  <div className='xs:relative flex md:flex-col lg:flex-row'>
                     <span className='block text-lg lg:hidden'>+</span>
                     <Link
                        className='lg:border-bottom-0 xs:border-bottom-1 border-gray-300 px-[36px] py-5 font-bold'
                        href='/'
                     >
                        HOME
                     </Link>
                     <Link
                        className='lg:border-bottom-0 xs:border-bottom-1 border-gray-300 px-[36px] py-5 font-bold'
                        href='/'
                     >
                        コラム・記事
                     </Link>
                     <Link
                        className='lg:border-bottom-0 xs:border-bottom-1 border-gray-300 px-[36px] py-5 font-bold'
                        href='/'
                     >
                        インターン・イベント情報
                     </Link>
                     <Link
                        className='lg:border-bottom-0 xs:border-bottom-1 border-gray-300 px-[36px] py-5 font-bold'
                        href='/'
                     >
                        このサイトについて
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Header
