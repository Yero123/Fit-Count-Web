import { useAllRutinesContext } from '@/contexts/AllRutinesContext';
import React, { useEffect, useState } from 'react'

const ChoseExercise = () => {
  const { loading, reportWeek, rutines, setloading, reset, saveCustomRutineLocalStorage, checkExercise, customRutine } = useAllRutinesContext();


  return <>
    {
      rutines.map((rutine: any, i: any) => {
        return <div key={i}>
          <h2 className='font-bold'> {rutine.name}</h2>
          {
            rutine.exercises?.map((exercise: any, i: any) => {
              console.log(!!customRutine.exercises.find((e: any) => e.id === exercise.id))
              return <div className='flex gap-2' key={i}>
                <input type='checkbox' onClick={() => { checkExercise(exercise) }} checked={
                  !!customRutine.exercises.find((e: any) => e.id === exercise.id)
                } />
                <h3> {exercise.name}</h3>
              </div>
            })
          }
        </div>
      })
    }
    <button className='bg-primary p-2 text-white rounded-xl px-6 mt-4 ' onClick={saveCustomRutineLocalStorage} >
      Guardar
    </button>
  </>
}

export default ChoseExercise