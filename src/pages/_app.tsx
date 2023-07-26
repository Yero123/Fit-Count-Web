import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/layout/Header';
import DoExerciseProvider from '@/contexts/DoExerciseContext';
export default function App({ Component, pageProps }: AppProps) {

  return <>
    <Header />

      <Component {...pageProps} />

  </>
}


