import { useThemeContext } from '@/contexts/ThemeProvider'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head title='FitCount'>
        <title>Fit Count</title>
      </Head>

      <body className={'bg-[#F4F7FE] h-screen dark:bg-[#02081B]'}  >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
