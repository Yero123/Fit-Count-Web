import { useEffect, useState } from 'react';
import { getRutines } from '@/firebase/rutine.service';
import Title from '@/components/ui/Title';
import ListRutines from '@/components/ListRutines';

export default function Home() {
  const [rutines, setrutines] = useState<any[]>([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true)
    getRutines().then((rutines) => {
      setrutines(rutines);
      setloading(false)
    });
  }, [])
  return (
    <main>
      <section className='px-8 py-6'>
        <Title loading={loading}>Hola, Yerodin</Title>
        <Title loading={loading}>Rutinas</Title>
        <ListRutines rutines={rutines} loading={loading} />
      </section>
    </main>
  )
}

{/* <SubTitle>Indicadores</SubTitle>
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
        </div> */}
{/* <div className='h-6' /> */ }