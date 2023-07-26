import { ReactElement } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'

type LayoutProps = {
   readonly children: ReactElement
}

export const MainLayout = ({ children }: LayoutProps) => {
   return (
      <>
         <Header></Header>
         <main>{children}</main>
         <Footer></Footer>
      </>
   )
}
