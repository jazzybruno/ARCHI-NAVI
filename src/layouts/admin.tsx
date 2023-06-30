import { ReactElement } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Sidemenu from 'components/admin/Sidemenu'

type LayoutProps = {
  readonly children: ReactElement
}

export const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className='sm:ml-64'>
        <Header></Header>
      </div>
      <Sidemenu></Sidemenu>
      <div className='p-4 sm:ml-64'>
        <main>{children}</main>
      </div>
      <div className='p-4 sm:ml-64'>
        <Footer></Footer>
      </div>
    </>
  )
}
