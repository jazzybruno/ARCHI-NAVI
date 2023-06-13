import type { GetServerSideProps, NextPageWithLayout } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { MainLayout } from 'src/layouts/main'
import { fetcher, httpClient } from 'src/services/httpClient'
import useSWR from "swr"
import { User } from 'src/types'
import { useEffect, useState } from 'react'

type Props = {
  title?: string;
};

const HomePage: NextPageWithLayout<Props> = (props) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => setIsClient(true), []);
  const { data: user, error } = useSWR("api/user", fetcher<User>)
  const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  return (
    <>
      <h1>{ props.title }</h1>
      <h3>{ user?.name ?? '未ログイン' }</h3>
      <p>
        { isClient ? date : '' }
      </p>
      <p>
        <Link href="/about">About</Link>
      </p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await httpClient().get('api/test')
  const props: Props = {
    title: res.data,
  }

  return {
    props: props,
  }
}

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default HomePage
