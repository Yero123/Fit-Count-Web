import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Modal from '../ui/Modal';
import { useAllRutinesContext } from '@/contexts/AllRutinesContext';
import ListRutines from '../ListRutines';
import ButtonTheme from '../ButtonTheme';



const Header = () => {
  const router = useRouter();
  const [visible, setisVisible] = useState(false);
  const openModal = () => { setisVisible(true) }
  const closeModal = () => { setisVisible(false) }
  // const { loading, reportWeek, rutines, setloading, reset } = useAllRutinesContext();
  const getTitle = () => {
    if (router.asPath === '/rutines') {
      return 'Rutines'
    }
    if (router.asPath === '/exercises') {
      return 'Exercises'
    }
    if (router.asPath === '/rutines/new') {
      return 'New Rutine'
    }
    if (router.asPath === '/exercises/new') {
      return 'New Exercise'
    }
    if (router.asPath === '/rutines/[id]') {
      return 'Rutine'
    }
    if (router.asPath === '/exercises/[id]') {
      return 'Exercise'
    }
    if (router.asPath === '/rutines/[id]/edit') {
      return 'Edit Rutine'
    }
    if (router.asPath === '/exercises/[id]/edit') {
      return 'Edit Exercise'
    }
    return 'Dashboard'
  }
  return (
    <header className='flex justify-between pt-8 px-6  md:hidden md:max-w-[1000px] md:m-auto md:bg-white md:rounded-xl md:my-6 md:pt-2 md:px-6 '>
      <Modal
        visible={visible}
        openModal={openModal}
        closeModal={closeModal}
      >

        <BodyModal closeModal={closeModal} />

      </Modal>
      <div className='flex justify-center items-center'>

        { <Link href="/" className=' font-bold text-[1.6rem] md:p-0 md:text-[1.8rem] dark:text-white'><h1>Fit count</h1></Link>}
        <span className='pl-8 items-end justify-end p-0 m-0 hidden md:block dark:text-white'>Home / {getTitle()}</span>
      </div>

      <div className='flex justify-center items-center gap-3'>
        <ButtonTheme />
        <Image onClick={openModal} src="/images/yero.png" alt="Profile picture" width="35" height="35" className='rounded-full pt-1' />
        {
          router.asPath === '/' ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:hidden dark:text-white ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            : <BackButton />
        }
      </div>
    </header>
  )
}

const BackButton = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {

    router.push('/');

  };

  return (
    <button onClick={handleBackButtonClick} className='ml-0 md:hidden dark:text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
      </svg>
    </button>
  );
};

const BodyModal = ({ closeModal }: any) => {
  const { loading, rutines } = useAllRutinesContext();

  return <>
    <div className='overflow-y-scroll h-[80vh] dark:bg-black'>
      <ListRutines rutines={rutines} loading={loading} closeModal={closeModal} />
    </div>
  </>
}
export default Header