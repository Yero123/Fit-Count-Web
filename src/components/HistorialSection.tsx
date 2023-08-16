import { useExerciseContext } from "@/contexts/DoExerciseContext";
import { useState } from "react"

const HistorialSection = () => {
  const { loading, sessionsByDate,sessionEditID} = useExerciseContext();
  if (loading) return <>
    <div className='flex justify-between px-1 mt-6 mb-4'>
      <p className='font-semibold'>Sesión</p>
      <p className='font-semibold'>Repeticiones</p>
      <p className='font-semibold'>Kilogramos </p>
    </div>
    <ul className='animate-pulse flex flex-col gap-4'>
      <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
      <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
      <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
      <li className=' flex  shadow px-2 py-2 text-lg bg-secondary gap-4 h-[170px] aspect-square rounded-2xl '></li>
    </ul>
  </>
  return <>
    <div className='flex justify-between px-1 mt-6 mb-4 '>
      <p className='font-semibold'>Sesión</p>
      <p className='font-semibold'>Kilogramos </p>
      <p className='font-semibold'>Repeticiones</p>
    </div>
    <div className='h-[50vh] overflow-y-scroll	md:h-[60vh]'>
      {
        loading ? <p>Loading</p> : sessionsByDate.map((item: any, i: any) => {
          return <div key={i}>
            <ul className='bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4 '>
              {
                item.sessions.map((session: any, i: number) =>
                  <SessionLi
                    key={session.id}
                    id={session.id}
                    i={i}
                    weight={session.weight}
                    repetitions={session.repetitions}
                    editMode={session.id===sessionEditID}
                  />
                )
              }
            </ul>
            <p className="text-center mt-3 font-semibold">{item.stringDate}</p>
          </div>
        })
      }
    </div>
  </>
}

export default HistorialSection

const SessionLi = ({ i, weight, repetitions, editMode, id }: any) => {
  const { sessionEditID,
    setsessionEditID,setinEditMode,setrepetitions,setweight, handleDeleteSession} = useExerciseContext();
  return <li key={i} className='flex justify-between'>
    {
      !editMode ? <>
        <div onClick={() => {
          setinEditMode(true)
          setsessionEditID(id);
          setweight(weight);
          setrepetitions(repetitions);
          // setEditSession(weight, repetitions) 
        }} className={'bg-primary rounded-full text-white font-bold aspect-square w-6 flex justify-center align-middle '}>
          <p className='text-center'>
            {i + 1}
          </p>
        </div>
        <p>{weight}</p>
        <p>{repetitions}</p>
      </> : <>
        <div className="flex gap-2">
          <div onClick={() => { setinEditMode(false),setsessionEditID("") }} className={'animate-pulse bg-primary rounded-full text-white font-bold aspect-square w-6 flex justify-center align-middle'}>
            <p className='text-center'>
              {i + 1}
            </p>
          </div>
          <svg onClick={handleDeleteSession} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

        </div>
        <p className="animate-pulse font-semibold">{weight}</p>
        <p className="animate-pulse font-semibold">{repetitions}</p>
      </>
    }

  </li>
}