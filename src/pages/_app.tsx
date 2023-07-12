import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header className='flex justify-between px-4 pt-4'>
      <div>
        <Image src="/images/logo.png" alt="Profile picture" width="120" height="200" />
      </div>
      <div>
        <Image src="/images/yero.png" alt="Profile picture" width="50" height="50" className='rounded-full' />
      </div>
    </header>
    <Component {...pageProps} />
  </>
}
