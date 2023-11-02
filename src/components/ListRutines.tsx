import React from 'react'
import RutineCard from './RutineCard'
import { useAllRutinesContext } from '@/contexts/AllRutinesContext'

const ListRutines = ({
  rutines,
  loading, closeModal
}: {
  rutines: any[],
  loading: boolean,
  closeModal?: any
}) => {

  const { customRutine } = useAllRutinesContext();
  if (loading) return <ul className='animate-pulse flex flex-col gap-4'>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
  </ul>


  return (
    <div className='flex flex-col gap-4'>
      {
        customRutine.exercises.length > 0 && <RutineCard id={customRutine.id} name={customRutine.name} exercises={customRutine.exercises} active={true} />
      }


      {rutines.map((rutine, i) => (
        <RutineCard key={i} id={rutine.id} name={rutine.name} exercises={rutine.exercises} active={true} closeModal={closeModal} />
      ))}
    </div>
  )
}

export default ListRutines