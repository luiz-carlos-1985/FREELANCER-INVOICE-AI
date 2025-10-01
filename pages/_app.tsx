import '../globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Freelancer Invoice AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='32' height='32' rx='6' fill='url(%23gradient)'/%3e%3cpath d='M8 10h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2zm0 4h8v2H8v-2z' fill='white'/%3e%3ccircle cx='24' cy='20' r='3' fill='white'/%3e%3cdefs%3e%3clinearGradient id='gradient' x1='0' y1='0' x2='32' y2='32' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%238B5CF6'/%3e%3cstop offset='1' stop-color='%23EC4899'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}