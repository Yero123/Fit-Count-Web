import React from 'react'
import RutineCard from './RutineCard'

const ListRutines = ({
  rutines,
  loading
}: {
  rutines: any[],
  loading: boolean
}) => {
  if (loading) return <ul className='animate-pulse flex flex-col gap-4'>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
  </ul>
  return (
    <div className='flex flex-col gap-4'>
      {rutines.map((rutine, i) => (
        <RutineCard key={i} id={rutine.id} name={rutine.name} exercises={rutine.exercises} />
      ))}
    </div>
  )
}

export default ListRutines