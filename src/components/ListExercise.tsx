import React from 'react'
import ExerciseCard from './ExerciseCard'
//todo models Rutine
const ListExercise = ({
  loading,
  rutine
}: {
  loading: boolean,
  rutine: any
}) => {

  if (loading) return <ul className='animate-pulse flex flex-col gap-4'>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[70px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[70px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[70px] aspect-square rounded-2xl '></li>
    <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[70px] aspect-square rounded-2xl '></li>
  </ul>
  return (
    <ul className='flex flex-col gap-4'>
      {rutine?.exercises.map((exercise: any) => (
        <ExerciseCard key={exercise.id} id={exercise.id} name={exercise.name} />
      ))}
    </ul>
  )
}

export default ListExercise