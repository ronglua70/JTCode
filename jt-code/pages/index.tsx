import Head from 'next/head'
import HomePage from '../modules/HomePage'

export default function Home() {
  return (
    <>
    
    <div>
      <Head>
        <title>JT Code | Just Try code</title>
        <meta name="description" content="Be better" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>

    <HomePage />

    </>
  )
}
