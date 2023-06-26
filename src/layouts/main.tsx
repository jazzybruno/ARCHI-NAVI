import { ReactElement } from 'react'
import useSWR from 'swr'
import Footer from 'components/Footer'
import Header from 'components/Header'
import { fetcher } from 'services/httpClient'
import { User } from 'types'

type LayoutProps = {
  readonly children: ReactElement
}

export const MainLayout = ({ children }: LayoutProps) => {
  const { data: user, error } = useSWR('api/user', fetcher<User>)
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}
