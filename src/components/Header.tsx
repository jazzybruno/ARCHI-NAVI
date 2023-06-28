import Link from 'next/link'
import * as React from 'react'
import useSWR from 'swr'
import { fetcher, httpClient } from 'services/httpClient'
import styles from 'styles/components/Header.module.scss'
import { User } from 'types'
import Router from 'next/router'

const Header = () => {
  const { data: user, error } = useSWR('api/user', fetcher<User>)

  const signout = async () => {
    try {
      await httpClient().post('api/auth/signout')
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
            <span>{user.name}</span>
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
