import Link from 'next/link'
import React from 'react'

const RutineCard = ({
  id,
  name,
  exercises
}: {
  id: string,
  name: string,
  exercises: any
}) => {
  return (
    <Link key={id} href={`rutines/${id}`}>
      <div key={id} className='bg-white rounded-lg shadow-md p-4 flex justify-between gap-4'>
        <div className='flex w-[84%] gap-4'>
          <div className='min-w-[35%] bg-tertiary rounded-2xl'>
          </div>
          <div>
            <h2 className='text-xl font-bold'>{name}</h2>
            <ul>
              {exercises.map((exercise: any) => (
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
  )
}

export default RutineCard