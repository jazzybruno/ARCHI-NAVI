import { format } from 'date-fns'
import type { GetServerSideProps, NextPageWithLayout } from 'next'
import { useEffect, useState } from 'react'
import MySection from 'components/MySection'
import Posts from 'components/Posts'
import { httpClient } from 'services/httpClient'
import { AdminLayout } from 'layouts/admin'

type Props = {
  title?: string
}

const AdminHomePage: NextPageWithLayout<Props> = (props) => {
  const [isClient, setIsClient] = useState<boolean>(false)
  useEffect(() => setIsClient(true), [])
  const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  return (
    <>
      <h1>{props.title}</h1>
      <p>{isClient ? date : ''}</p>
      <MySection></MySection>
      <Posts></Posts>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await httpClient().get('api/test')
  const props: Props = {
    title: 'Hello World',
  }

  return {
    props: props,
  }
}

AdminHomePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default AdminHomePage
