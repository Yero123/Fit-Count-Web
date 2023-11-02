import { useExerciseContext } from "@/contexts/DoExerciseContext";
import { useState } from "react";

const FormSet = () => {
  const { loading ,weight,repetitions ,handleAddSession,handleChangeWeight, handleChangeRepetitions,inEditMode,handleEditSession} = useExerciseContext();
  if (loading) return <div className=' bg-white absolute bottom-4 flex justify-between align-middle w-[90%]'>
    <div className='flex flex-col shadow-md p-4 gap-2 bg-white'>
      <label htmlFor="kilogramos">Kilogramos</label>
      <input
        type="number"
        className='p-2 bg-zinc-100 max-w-[100px] animate-pulse bg-gray-light rounded-lg border-2 border-secondary'
        value={0}
      />
    </div>
    <div className='flex flex-col shadow-md p-4 gap-2 bg-white'>
      <label htmlFor="repetitions">Repetitions</label>
      <input
        type="number"
        className='p-2 bg-zinc-100 max-w-[100px] animate-pulse bg-gray-light rounded-lg border-2 border-secondary'
        value={0}
      />
    </div>
    <button className='w-20 h-20 bg-[#94b1f5] text-white font-bold self-center rounded-xl' >
    </button>
  </div>
  return <div className='absolute bottom-4 flex justify-between align-middle w-[90%] md:max-w-[400px] self-center self items-center'>
    <div className='flex flex-col shadow-md p-4 gap-2 bg-white'>
      <label htmlFor="kilogramos">Kilogramos</label>
      <input
        type="number"
        className='p-2 bg-zinc-100 max-w-[100px]  bg-tertiary rounded-lg border-2 border-secondary'
        value={weight}
        onChange={handleChangeWeight}
      />
    </div>
    <div className='flex flex-col shadow-md p-4 gap-2 bg-white'>
      <label htmlFor="repetitions">Repetitions</label>
      <input
        type="number"
        className='p-2 bg-zinc-100 max-w-[100px]  bg-tertiary rounded-lg border-2 border-secondary'
        value={repetitions}
        onChange={handleChangeRepetitions}
      />
    </div>
    <button className='w-20 h-20 bg-primary text-white font-bold self-center rounded-xl' onClick={inEditMode?handleEditSession:handleAddSession}>{
      inEditMode?"Editar":"+"
    }</button>
  </div>
}

export default FormSet

