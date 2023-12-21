import { UserProvider } from '@/utils/UserContext'
import '@/styles/globals.css'
import Head from 'next/head'
import Title from'@/components/title'
import Header from '@/components/header'

export default function App({
   Component, 
   pageProps: {pageProps},
  }) {

  return (
    <>
     <UserProvider>
        <Head>
          <title>Parc-app</title>
          <meta name="description" content="Votre application de gestion" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Title />
        <Component  {...pageProps}/> 
      </UserProvider>
    </>
  )
}
