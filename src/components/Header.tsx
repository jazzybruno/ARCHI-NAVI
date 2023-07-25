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

   return (
      <div className={styles.header}>
         <div className={styles.logo}>
            <Link href='/'>建築学生のための就活情報サイト</Link>
         </div>
         <div className={styles.actions}>
            {user ? (
               <div>
                  <Link className={styles.action} href='/mypage'>
                     マイページ
                  </Link>
                  <button className={styles.action} onClick={signout}>
                     ログアウト
                  </button>
               </div>
            ) : (
               <div>
                  <Link className={styles.action} href='/signin'>
                     ログイン
                  </Link>
                  <Link className={styles.action} href='/signup'>
                     新規登録
                  </Link>
               </div>
            )}
         </div>
      </div>
   )
}

export default Header
