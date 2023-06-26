import { ReactElement } from "react"
import { fetcher } from "services/httpClient"
import useSWR from "swr"
import { User } from "types"
import Header from "components/Header"
import Footer from "components/Footer"

type LayoutProps = {
  readonly children: ReactElement
}

export const MainLayout = ({ children }: LayoutProps) => {
  const { data: user, error } = useSWR("api/user", fetcher<User>)
  return (
    <>
      <Header></Header>
      <main>
        { children }
      </main>
      <Footer></Footer>
    </>
  )
}