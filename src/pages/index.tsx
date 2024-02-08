import { useEffect, useState } from 'react';
import { createRutine, getRutines } from '@/firebase/rutine.service';
import Title from '@/components/ui/Title';
import ListRutines from '@/components/ListRutines';
import FloatingAddButton from '@/components/FloatingAddButton';
import Modal from '@/components/ui/Modal';
import { getDaysWorkedByWeek, passSessions } from '@/firebase/sessions.service';
import { useAllRutinesContext } from '@/contexts/AllRutinesContext';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import CheckIcon from '@/components/icons/CheckIcon';
import Xicon from '@/components/icons/Xicon';
import LineIcon from '@/components/icons/LineIcon';

export default function Home() {


  const [visible, setisVisible] = useState(false)
  const openModal = () => { setisVisible(true) }
  const closeModal = () => { setisVisible(false) }
  const { loading, reportWeek, rutines, setloading, reset } = useAllRutinesContext();
  return (

    <main>
      <Title loading={loading}>Rutinas</Title>
      <div className='flex gap-8'>
        <RutineTable />
        <div className='flex bg-white rounded-lg flex-col shadow px-3 pb-6 pt-1 relative md:px-8 md:py-6 md:mb-6 z-0 flex-1 w-full'>
          <div className='flex justify-between '>
            <DayWorkout day="Lun" active={reportWeek[1]} />
            <DayWorkout day="Mar" active={reportWeek[2]} />
            <DayWorkout day="Mie" active={reportWeek[3]} />
            <DayWorkout day="Jue" active={reportWeek[4]} />
            <DayWorkout day="Vie" active={reportWeek[5]} />
            <DayWorkout day="Sab" active={reportWeek[6]} />
            <DayWorkout day="Dom" active={reportWeek[0]} />
          </div>
          <div className='bg-gray-light h-[3px] w-[94%] absolute top-7 md:top-[3.6rem] rounded-full'></div>
        </div>
      </div>
      <Title loading={loading}>Semana</Title>
      <Title loading={loading}>Rutinas</Title>
      <ListRutines rutines={rutines} loading={loading} />
      <FloatingAddButton openModal={openModal} />
      <Modal
        visible={visible}
        openModal={openModal}
        closeModal={closeModal}
      >
        <FormCreateRutine setloading={setloading} closeModal={closeModal} reset={reset} />
      </Modal>
      <Link href={'/choseExercise'} >
        <button className='bg-primary p-2 text-white rounded-xl px-6 mt-4 ' >
          Escoger Ejercicios
        </button>
      </Link>
    </main>
  )
}

const RutineTable = () => {

  return <div className="mb-6 shadow-md rounded-2xl">
    <div className="overflow-x-auto rounded-2xl">
      <table className={`w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 }`}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-[#A3AED0] font-medium">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-[#A3AED0] font-medium">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-[#A3AED0] font-medium">
              Ultima modificacion
            </th>
            <th scope="col" className="px-6 py-3 text-[#A3AED0] font-medium">
              Progreso
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              Empuje
            </th>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              <div className='flex gap-2'>
                <CheckIcon className='h-5 w-5 text-[#05CD99]' /> Completado
              </div>
            </td>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              19 feb 2024
            </td>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              <div className="w-full">
                <ProgressBar total={100} value={75} />
              </div>
            </td>
          </tr>
          <tr className="bg-white ">
            <th scope="row" className="px-6 py-4 font-bold text-[#2B3674]  text-gray-900 whitespace-nowrap">
              Jale
            </th>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              <div className='flex gap-2'>

                <Xicon className='h-5 w-5 text-[#EE5D50]' /> No iniciado
              </div>
            </td>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              19 feb 2024
            </td>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              Completo
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-bold text-[#2B3674]  text-gray-900 whitespace-nowrap">
              Pierna
            </th>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              <div className='flex gap-2'>

                <LineIcon className='h-5 w-5 text-[#FFCE20]' /> En progreso
              </div>
            </td>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              19 feb 2024
            </td>
            <td className="px-6 py-4 font-bold text-[#2B3674]">
              $11 feb 2024
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

}

const ProgressBar = ({ total, value }: any) => {
  // Calcular el porcentaje completado
  const progress = (value / total) * 100;

  return (
    <div className="w-full bg-[#EFF4FB] rounded-lg overflow-hidden h-3">
      <div className="h-3 bg-[#C5F541]" style={{ width: `${progress}%` }}></div>
    </div>
  );
};
const DayWorkout = ({ day, active }: any) => {
  return <div className='flex flex-col justify-center'>
    <span className="text-gray-light text-xs md:text-base font-semibold text-center">{day}</span>
    {active ? <div className='bg-primary w-8 h-8 rounded-full flex justify-center items-center mt-5 md:w-12 md:h-12 md:mt-8' >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="5" stroke="currentColor" className="w-3 h-3 text-white md:w-5 md:h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div> : <div className='bg-gray-light w-8 h-8 rounded-full flex justify-center items-center mt-5 md:w-12 md:h-12 md:mt-8' >
      <div
        className='bg-white rounded-full w-2 h-2'
      ></div>

    </div>}
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

const FormCreateRutine = ({ setloading, closeModal, reset }: any) => {
  const [nameRutine, setnameRutine] = useState('');
  const create = () => {
    setloading(true)
    createRutine(nameRutine).then(() => {
      setloading(false);
      closeModal();
      reset()
    })
  }
  return <>
    <h2 className='text-xl'>Crear rutina</h2>
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 mt-5">First name</label>
      <input
        value={nameRutine}
        onChange={(e) => setnameRutine(e.target.value)}
        type="text" id="first_name" className="bg-gray-50 border border-gray-light text-gray text-sm rounded-lg focus:ring-blue-500 focus:border-primary-text block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre de rutina " required />
      <div className='flex items-end justify-end'>
        <button className='bg-primary p-2 text-white rounded-xl px-6 mt-4 ' onClick={create}>
          Crear
        </button>
      </div>
    </div>
  </>
}
