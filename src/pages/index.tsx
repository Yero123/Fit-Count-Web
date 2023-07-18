import Image from 'next/image'
import { db } from '@/firebase/config'
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRutines } from '@/firebase/rutine.service';
import Title from '@/components/ui/Title';
import { LineChart } from '@/components/charts/LineChart';
import SubTitle from '@/components/ui/SubTitle';

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
        <Title >Hola, Yerodin</Title>

        <SubTitle>Indicadores</SubTitle>
        <div className=' flex flex-row gap-2 flex-wrap'>
          <div className='bg-white shadow max-w-[200px] p-4 flex gap-4 rounded-2xl'>
            <div className='rounded-full bg-secondary  w-12 h-12 flex  justify-center items-center '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
              </svg>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-light text-sm'>Peso levantado</p>
              <p className='text-xl text-black font-bold'>240</p>
            </div>
          </div>
          <div className='bg-white shadow max-w-[200px] p-4 flex gap-4 rounded-2xl'>
            <div className='rounded-full bg-secondary  w-12 h-12 flex  justify-center items-center '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
              </svg>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-light text-sm'>Peso levantado</p>
              <p className='text-xl text-black font-bold'>240</p>
            </div>
          </div>
        </div>
        <SubTitle>Progreso</SubTitle>
        <div className='bg-white py-4 rounded-xl'>
          <LineChart />
        </div>
        <div className='h-6' />
        <Title>Rutinas</Title>
        <div className='flex flex-col gap-4'>
          {rutines.map((rutine, i) => (
            <Link key={i} href={`rutines/${rutine.id}`}>
              <div key={rutine.id} className='bg-white rounded-lg shadow-md p-4 flex justify-between gap-4'>
                <div className='flex w-[84%] gap-4'>
                  <div className='min-w-[35%] bg-tertiary rounded-2xl'>
                    {/* <Image src="/images/exercise.png" alt="Profile picture" width="200" height="50" className='rounded-lg ' /> */}
                  </div>
                  <div>
                    <h2 className='text-xl font-bold'>{rutine.name}</h2>
                    <ul>
                      {rutine.exercises.map((exercise: any) => (
                        <li key={exercise.id}>{exercise.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='flex flex-col justify-between w-1/6'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-gray-light text-sm'>Peso levantado</p>
                    <p className='text-xl text-black font-bold'>240</p>
                  </div>
                  <div className='bg-secondary rounded-xl px-2 py-1'>
                    <p className='text-primary-text text-center text-sm'>Iniciar</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
