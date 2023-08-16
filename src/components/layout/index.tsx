import React from 'react'
import Header from './Header'

const Layout = ({
  children
}: any) => {
  return (
    <section className='px-6 py-6 pt-2 md:max-w-[1000px] md:m-auto md:px-0'>
      <Header />
      {
        children
      }
    </section>
  )
}

export default Layout