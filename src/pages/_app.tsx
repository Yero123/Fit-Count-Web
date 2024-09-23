import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/layout/Header';
import DoExerciseProvider from '@/contexts/DoExerciseContext';
import Layout from '@/components/layout';
import AllRutinesContext from '@/contexts/AllRutinesContext';
import ThemeProvider, { ThemeContext } from '@/contexts/ThemeProvider';
export default function App({ Component, pageProps }: AppProps) {

  return <>
    <ThemeProvider>
      <AllRutinesContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AllRutinesContext>
    </ThemeProvider>
  </>
}


