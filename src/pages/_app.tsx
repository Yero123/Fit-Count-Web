import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header className='flex justify-between px-4 pt-4'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>

      </div>
      <div>
        <Image src="/images/yero.png" alt="Profile picture" width="50" height="50" className='rounded-full' />
      </div>
    </header>
    <Component {...pageProps} />
  </>
}
