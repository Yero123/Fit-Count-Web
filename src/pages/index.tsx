import Image from 'next/image'
import { db } from '@/firebase/config'
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRutines } from '@/firebase/rutine.service';
import Title from '@/components/ui/Title';

export default function Home() {
  const [rutines, setrutines] = useState<any[]>([]);
  useEffect(() => {
    getRutines().then((rutines) => {
      setrutines(rutines);
    });
  }, [])
  console.log(rutines)
  return (
    <main>

      <section className='px-8 py-6'>
        <Title >Rutinas</Title>
        <div className='flex flex-col gap-4'>
          {rutines.map((rutine, i) => (
            <Link key={i} href={`rutines/${rutine.id}`}>
              <div key={rutine.id} className='bg-white rounded-lg shadow-md p-4 flex justify-between'>
                <div>
                  <h2 className='text-xl font-bold'>{rutine.name}</h2>
                  <ul>
                    {rutine.exercises.map((exercise: any) => (
                      <li key={exercise.id}>{exercise.name}</li>
                    ))}
                  </ul>
                </div>
                <div className='w-2/5'>
                  <Image src="/images/exercise.png" alt="Profile picture" width="200" height="50" className='rounded-lg ' />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
