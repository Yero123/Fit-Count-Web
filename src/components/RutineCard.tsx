import Link from 'next/link'
import React from 'react'

const RutineCard = ({
  id,
  name,
  exercises,
  closeModal
}: {
  id: string,
  name: string,
  exercises: any,
  active: boolean,
  closeModal?: any
}) => {

  return (

    <div key={id} className='bg-white rounded-lg shadow-md p-4 flex justify-between gap-4  dark:bg-black'>
      <div className='flex w-[84%] gap-4'>
        {/* <div className='min-w-[35%] bg-tertiary rounded-2xl'>
          </div> */}
        <div>
          <Link key={id} href={`rutines/${id}`}> <h2 className={"text-xl font-bold"}>{name}</h2>     </Link>
          <ul className='pt-2'>
            {exercises.map((exercise: any) => {
              let style = " ";
              if (exercise.active) {
                style = " text-primary"
              }
              return <Link onClick={() => {
                if (closeModal) closeModal()
              }} href={`/exercises/${exercise.id}`} key={exercise.id}>
                <li className={"text-[16px] pb-2" + style}>{exercise.name}</li>
              </Link>
            })}
          </ul>
        </div>
      </div>
      {/* <div className='flex flex-col justify-between w-2/6'>
          <div className='flex flex-col gap-2'>
            <p className='text-gray-light text-sm'>Peso levantado</p>
            <p className='text-xl text-black font-bold'>240</p>
          </div>
          <div className='bg-secondary rounded-xl px-2 py-1'>
            <p className='text-primary-text text-center text-sm'>Iniciar</p>
          </div>
        </div> */}
    </div>

  )
}

export default RutineCard