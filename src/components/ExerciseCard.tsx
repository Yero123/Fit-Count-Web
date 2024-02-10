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
    style = " !font-bold !text-black"
  }
  return (
    <Link key={id} href={`/exercises/${id}`}>
      <li className='flex rounded-xl shadow px-6 py-2 text-lg bg-[#DCFFA4] gap-1 dark:bg-primary flex-col'>
        <div className='flex gap-2'>
          <Tag name='Peso' />
          <Tag name='Repeticiones' />
        </div>
        <div>
          <p className={"font-semibold text-slate-500" + style}>
            {name}
          </p>
          {/* <p className='inline text-gray-light-light'>Peso Levantado:</p><p className='inline pl-2 text-gray-light'>40</p> */}
        </div>
      </li>
    </Link>
  )
}

const Tag = ({ name }: { name: string }) => {
  return (
    <div className='rounded-full bg-white p-1 px-2 text-[#75BC00] text-xs'>
      {name}
    </div>
  )
}
export default ExerciseCard