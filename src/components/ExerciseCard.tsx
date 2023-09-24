import Link from 'next/link'
import React from 'react'

const ExerciseCard = ({
  id,
  name,
  active
}: {
  id: string,
  name: string,
  active: boolean,
}) => {
  let style = " ";
  if (active) {
    style = " text-primary-text"
  }
  return (
    <Link key={id} href={`/exercises/${id}`}>
      <li className='flex rounded-xl shadow px-2 py-2 text-lg bg-white gap-4'>
        <div className='h-[100%] bg-secondary aspect-square rounded-2xl w-16'>
        </div>
        <div>
          <p className={"font-semibold" + style}>
            {name}
          </p>
          <p className='inline text-gray-light-light'>Peso Levantado:</p><p className='inline pl-2 text-gray-light'>40</p>
        </div>
      </li>
    </Link>
  )
}

export default ExerciseCard