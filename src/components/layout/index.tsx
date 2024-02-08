import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Image from 'next/image'
const Layout = ({
  children
}: any) => {
  return (
    <section className='md:flex bg-white'>
      <Sidebar />
      <Header />
      <div className='flex w-full flex-1 px-12 py-12 flex-col'>
        <div className='flex justify-between w-full h-min align-middle '>
          <p className='text-center p-0 m-0'>Pages / Main Dashboard</p>

          <div className='flex justify-center items-center'>
            <Image src="/images/yero.png" alt="Profile picture" width="35" height="35" className='rounded-full pt-1' />
          </div>
        </div>
        {
          children
        }
      </div>

    </section>
  )
}

export default Layout