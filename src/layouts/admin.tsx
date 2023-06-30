import { ReactElement } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'

type LayoutProps = {
  readonly children: ReactElement
}

export const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}
