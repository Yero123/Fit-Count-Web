import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import SaveIcon from '../icons/SaveIcon';

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className='hidden md:flex min-w-[340px] px-20 bg-[#FAFAFA] h-[100vh] flex-col'>

      {router.asPath === '/' && <Link href="/" className='pl-4 font-bold text-[1.6rem] md:p-0 md:text-[2rem] mt-12'><h1>Fit count</h1></Link>}
      <div className='flex flex-col mt-12 gap-6'>
        <div className='flex gap-3'>
          <div className='rounded-full bg-primary h-9 w-9  flex items-center justify-center '>
            <SaveIcon className='h-5 w-5 self-center' />
          </div>
          <p className='font-bold text-xl self-center'>Dashboard</p>
        </div>
        <div className='flex gap-3'>
          <div className='rounded-full  h-9 w-9  flex items-center justify-center '>
            {/* <SaveIcon className='h-5 w-5 self-center' /> */}
          </div>
          <p className='font-semibold text-[#939393] text-xl self-center'>Rutines</p>
        </div>
        <div className='flex gap-3'>
          <div className='rounded-full  h-9 w-9  flex items-center justify-center '>
            {/* <SaveIcon className='h-5 w-5 self-center' /> */}
          </div>
          <p className='font-semibold text-[#939393] text-xl self-center'>Exercise</p>
        </div>
        <div className='flex gap-3'>
          <div className='rounded-full  h-9 w-9  flex items-center justify-center '>
            {/* <SaveIcon className='h-5 w-5 self-center' /> */}
          </div>
          <p className='font-semibold text-[#939393] text-xl self-center'>Empuje</p>
        </div>
        <div className='flex gap-3'>
          <div className='rounded-full  h-9 w-9  flex items-center justify-center '>
            {/* <SaveIcon className='h-5 w-5 self-center' /> */}
          </div>
          <p className='font-semibold text-[#939393] text-xl self-center'>Jale</p>
        </div>
        <div className='flex gap-3'>
          <div className='rounded-full  h-9 w-9  flex items-center justify-center '>
            {/* <SaveIcon className='h-5 w-5 self-center' /> */}
          </div>
          <p className='font-semibold text-[#939393] text-xl self-center'>Pierna</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar