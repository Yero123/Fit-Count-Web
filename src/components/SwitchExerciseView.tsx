import { useExerciseContext } from '@/contexts/DoExerciseContext'
import React from 'react'

const SwitchExerciseView = () => {
  const styleButtonActive = "bg-secondary w-1/2 rounded-xl py-1"
  const styleButtonInactive = "w-1/2 rounded-xl py-1"
  const styleTextActive = "text-primary-text text-center font-medium "
  const styleTextInactive = "text-center font-medium text-gray-light"
  const { view, setview } = useExerciseContext();
  
  return (
    <div className='bg-white p-2 flex justify-between rounded-xl'>
      <button className={view === "historial" ? styleButtonActive : styleButtonInactive}
        onClick={() => { setview("historial") }}
      >
        <p className={view === "historial" ? styleTextActive : styleTextInactive}>Historial</p>
      </button>
      <button
        className={view === "estadisticas" ? styleButtonActive : styleButtonInactive}
        onClick={() => {
          setview("estadisticas")
        }}
      >
        <p
          className={view === "estadisticas" ? styleTextActive : styleTextInactive}
        >Estadisticas</p>
      </button>
    </div>
  )
}

export default SwitchExerciseView