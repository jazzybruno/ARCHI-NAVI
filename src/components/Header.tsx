import * as React from "react"
import { fetcher } from "services/httpClient"
import useSWR from "swr"
import { User } from "types"
import styles from "styles/components/Header.module.scss"

const Header = () => {
  const { data: user, error } = useSWR("api/user", fetcher<User>)
  return (
    <div className={styles.header}>
      建築学生のための就活情報サイト { user?.name ?? "未ログイン" }
    </div>
  )
}

export default Header
