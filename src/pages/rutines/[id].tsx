import Title from '@/components/ui/Title';
import { db } from '@/firebase/config';
import { getRutine } from '@/firebase/rutine.service';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const RutinePage = (props: any) => {
  const [rutine, setrutine] = useState<any>();
  const router = useRouter()

  console.log(router)
  useEffect(() => {
    if (!router.isReady) return;
    console.log(router.query.id)
    getRutine(router.query.id as string).then((rutine) => {
      setrutine(rutine);
    });
  }, [router.isReady])

  return (
    <div className='px-8 py-6'>
      <Title >{rutine?.name}</Title>
      <ul className='flex flex-col gap-4'>
        {rutine?.exercises.map((exercise: any) => (
          <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
            <li className='flex rounded-xl border border-gray-800 px-4 py-4 text-lg'>{exercise.name}</li>
          </Link>
        ))}
      </ul>

    </div>
  )
}

export default RutinePage