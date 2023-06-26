import * as React from 'react'
import useSWR from 'swr'
import { fetcher } from 'services/httpClient'
import styles from 'styles/components/Header.module.scss'
import { User } from 'types'

const Header = () => {
  const { data: user, error } = useSWR('api/user', fetcher<User>)
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <a href='/'>建築学生のための就活情報サイト</a>
      </div>
      <div className={styles.actions}>
        {user ? (
          <p>
            <span>{user.name}</span>
          </p>
        ) : (
          <div>
            <a className={styles.action} href='/signin'>
              ログイン
            </a>
            <a className={styles.action} href='/signup'>
              新規登録
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
