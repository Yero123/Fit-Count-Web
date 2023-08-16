import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/layout/Header';
import DoExerciseProvider from '@/contexts/DoExerciseContext';
import Layout from '@/components/layout';
export default function App({ Component, pageProps }: AppProps) {

  return <>

    <Layout>
      <Component {...pageProps} />
    </Layout>

  </>
}


