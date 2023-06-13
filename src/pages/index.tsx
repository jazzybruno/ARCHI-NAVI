import type { GetServerSideProps, NextPageWithLayout } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { MainLayout } from 'src/layouts/main'
import { httpClient } from 'src/services/httpClient'

type Props = {
  title?: string;
};

const HomePage: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <h1>{ props.title }</h1>
      <p>
        { format(new Date(), 'yyyy-MM-dd') }
      </p>
      <p>
        <Link href="/about">About</Link>
      </p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await httpClient().get('http://127.0.0.1:8000/api/test')
  const props: Props = {
    title: res.data,
  }

  return {
    props: props,
  }
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
