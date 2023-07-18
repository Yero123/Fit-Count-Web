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
            <li className='flex rounded-xl shadow px-2 py-2 text-lg bg-white gap-4'>
              <div className='h-[100%] bg-secondary aspect-square rounded-2xl w-16'>
              </div>
              <div>
                <p className='font-semibold'>
                  {exercise.name}
                </p>
                <p className='inline text-gray-light'>Peso Levantado:</p><p className='inline pl-2 text-gray-light'>40</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

    </div>
  )
}

export default RutinePage