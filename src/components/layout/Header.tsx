import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Header = () => {
  const router = useRouter();
  return (
    <header className='flex justify-between px-4 pt-4'>
    <div>
      {
        router.asPath === '/' ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          : <BackButton />
      }
    </div>
    <div>
      <Image src="/images/yero.png" alt="Profile picture" width="50" height="50" className='rounded-full' />
    </div>
  </header>
  )
}

const BackButton = () => {
  const router = useRouter();
  const [historyStack, sethistoryStack] = useState<any[]>([])

  useEffect(() => {
    sethistoryStack([
      ...historyStack,
      router.asPath
    ])

    if (historyStack.length > 5) {
      sethistoryStack(historyStack);
    }
  }, [router.asPath,historyStack]);

  const handleBackButtonClick = () => {
    if (historyStack.length > 0) {
      sethistoryStack(historyStack.splice(-1)); 
      const previousPath = historyStack[historyStack.length - 1];
      sethistoryStack(historyStack.splice(-1)); 
      console.log(previousPath)
      if (!previousPath || previousPath ==="/exercises/[idExercise]") {
        router.push('/');
      } else {
        router.push(previousPath); 
      }
    } else {
      router.push('/');
    }
  };

  return (
    <button onClick={handleBackButtonClick} className='ml-2'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
      </svg>
    </button>
  );
};
export default Header