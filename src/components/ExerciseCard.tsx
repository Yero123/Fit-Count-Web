import Link from 'next/link'
import React from 'react'

const ExerciseCard = ({
  id,
  name
}: {
  id: string,
  name: string
}) => {
  return (
    <Link key={id} href={`/exercises/${id}`}>
      <li className='flex rounded-xl shadow px-2 py-2 text-lg bg-white gap-4'>
        <div className='h-[100%] bg-secondary aspect-square rounded-2xl w-16'>
        </div>
        <div>
          <p className='font-semibold'>
            {name}
          </p>
          <p className='inline text-gray-light-light'>Peso Levantado:</p><p className='inline pl-2 text-gray-light'>40</p>
        </div>
      </li>
    </Link>
  )
}

export default ExerciseCard