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

      <Title loading={loading}>Semana</Title>
      <div className=' flex gap-4 mb-4 '>
        <Statistic />
        <Statistic />
      </div>
      <div className='flex bg-white rounded-lg flex-col shadow px-3 pb-6 pt-1 relative md:px-8 md:py-6 md:mb-6 '>
        <div className='flex justify-between '>
          <DayWorkout day="Lun" />
          <DayWorkout day="Mar"/>
          <DayWorkout day="Mie"/>
          <DayWorkout day="Jue"/>
          <DayWorkout day="Vie"/>
          <DayWorkout day="Sab"/>
          <DayWorkout day="Dom"/>
        </div>
        <div className='bg-gray-light h-[3px] w-[94%] absolute top-7 md:top-[3.6rem] rounded-full'></div>
      </div>
      <Title loading={loading}>Rutinas</Title>

      <ListRutines rutines={rutines} loading={loading} />
    </main>
  )
}
const DayWorkout = ({day}:any) => {
  return <div className='flex flex-col justify-center'>
    <span className="text-gray-light text-xs md:text-base font-semibold text-center">{day}</span>
    <div className='bg-primary w-8 h-8 rounded-full flex justify-center items-center mt-5 md:w-12 md:h-12 md:mt-8' >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" className="w-3 h-3 text-white md:w-5 md:h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>

    </div>
  </div>
}
const Statistic = () => {
  return <div className='bg-white max-w-[200px] flex p-2 rounded-lg gap-3 justify-center items-center shadow md:p-5 md:max-w-none'>
    <div className='w-10 h-10 bg-secondary rounded-lg flex justify-center items-center'>
      <div className='bg-primary w-3 h-3 rounded-full' />
    </div>
    <div className='flex flex-col'>
      <span className='font-regular text-gray-light text-xs md:text-lg'>Peso levantado</span>
      <span className='font-bold text-base'>250Kg</span>
    </div>
  </div>
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