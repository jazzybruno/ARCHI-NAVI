import type { GetServerSideProps, NextPageWithLayout } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { MainLayout } from 'src/layouts/main'

type Props = {
  title?: string;
};

const HomePage: NextPageWithLayout = (props: Props) => {
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

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async () => {
  const props: Props = {
    title: 'Home',
  }

  return {
    props: props,
  }
}

export default HomePage
