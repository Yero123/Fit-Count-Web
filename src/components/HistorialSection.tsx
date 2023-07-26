const HistorialSection = ({
  loading,
  sessionsByDate,
}: any) => {
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
    <div className='flex justify-between px-1 mt-6 mb-4'>
      <p className='font-semibold'>Sesión</p>
      <p className='font-semibold'>Kilogramos </p>
      <p className='font-semibold'>Repeticiones</p>
    </div>
    <div className='h-[50vh] overflow-scroll	'>
      {
        loading ? <p>Loading</p> : sessionsByDate.map((item: any, i: any) => {
          return <div key={i}>
            <ul className='bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4 '>
              {
                item.sessions.map((session: any, i: number) =>
                  <li key={i} className='flex justify-between'> <div className='bg-primary rounded-full text-white font-bold aspect-square w-6 flex justify-center align-middle'>
                    <p className='text-center'>
                      {i + 1}
                    </p>
                  </div>
                    <p>{session.weight}</p>
                    <p>{session.repetitions}</p>
                  </li>)
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