import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Modal from '../ui/Modal';
import { useAllRutinesContext } from '@/contexts/AllRutinesContext';
import ListRutines from '../ListRutines';



const Header = () => {
  const router = useRouter();
  const [visible, setisVisible] = useState(false);
  const openModal = () => { setisVisible(true) }
  const closeModal = () => { setisVisible(false) }
  // const { loading, reportWeek, rutines, setloading, reset } = useAllRutinesContext();

  return (
    <header className='flex justify-between pt-8 pb-2 md:hidden md:max-w-[1000px] md:m-auto md:bg-white md:rounded-xl md:my-6 md:pt-2 md:px-6 '>
      <Modal
        visible={visible}
        openModal={openModal}
        closeModal={closeModal}
      >

        <BodyModal closeModal={closeModal}/>

      </Modal>
      <div className='flex justify-center items-center'>
        {
          router.asPath === '/' ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:hidden">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            : <BackButton />
        }
        {router.asPath === '/' && <Link href="/" className='pl-4 font-bold text-[1.6rem] md:p-0 md:text-[1.8rem]'><h1>Fit count</h1></Link>}
        <span className='pl-8 items-end justify-end p-0 m-0 hidden md:block'>Home / Dashboard</span>
      </div>

      <div className='flex justify-center items-center'>
        <Image onClick={openModal} src="/images/yero.png" alt="Profile picture" width="35" height="35" className='rounded-full pt-1' />
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
    <button onClick={handleBackButtonClick} className='ml-0 md:hidden'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
      </svg>
    </button>
  );
};

const BodyModal = ({closeModal}:any) => {
  const { loading, rutines } = useAllRutinesContext();

  return <>
    <div className='overflow-y-scroll h-[80vh]'>
      <ListRutines rutines={rutines} loading={loading} closeModal={closeModal} />
    </div>
  </>
}
export default Header