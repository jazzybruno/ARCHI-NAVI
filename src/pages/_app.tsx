import type { AppPropsWithLayout } from 'next/app'
import Head from 'next/head'
import 'styles/globals.scss'

interface MyAppProps extends AppPropsWithLayout { }

function MyApp(props: MyAppProps) {
   const { Component, pageProps } = props
   const getLayout = Component.getLayout ?? ((page) => page)

   return getLayout(
      <>
         <Head>
            <title>建築学生のための就活情報サイト</title>
            <meta name='viewport' content='initial-scale=1, width=device-width' />
         </Head>
         <Component {...pageProps} />
      </>,
   )
}

export default MyApp
