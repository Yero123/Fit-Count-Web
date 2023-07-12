import Title from '@/components/ui/Title';
import { db } from '@/firebase/config';
import { getExercise } from '@/firebase/exercise.service';
import { getRutine } from '@/firebase/rutine.service';
import { addSession } from '@/firebase/sessions.service';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ExercisePage = () => {
  const [exercise, setexercise] = useState<any>();
  const [sessionsByDate, setsessionsByDate] = useState<any[]>([]); // [ {id: '1', kilogramos: 10, repeticiones: 12}
  const router = useRouter()
  const [loading, setloading] = useState(false);
  console.log(exercise)
  useEffect(() => {
    if (!router.isReady) return;
    getExercise(router.query.idExercise as string).then((rutine: any) => {
      setexercise(rutine);
      let arrayByDate: { stringDate: string, sessions: any[] }[] = []
      rutine?.sessions.forEach((session: any) => {
        let stringDate = new Date(session.date.seconds * 1000).toLocaleDateString('en-GB')
        console.log(new Date(session.date.seconds * 1000).toLocaleDateString())
        let actualDate = arrayByDate.find((item) => item.stringDate === stringDate)
        if (actualDate) {
          actualDate.sessions = [...actualDate.sessions, session]
        } else {
          arrayByDate.push({ sessions: [session], stringDate })
        }
      });


      setsessionsByDate(arrayByDate.reverse())
    });

  }, [router.isReady, loading])
  console.log(sessionsByDate)

  const [repetitions, setrepetitions] = useState(0);
  const [weight, setweight] = useState(0)

  const handleAddSession = async () => {
    setloading(true)
    addSession(exercise.id, { repetitions, weight, date: new Date() }).then(() => {
      setloading(false)
    })
    setrepetitions(0)
    setweight(0)
  }
  return (
    <div className='px-8 py-6 flex flex-col '>
      <Title >{exercise?.name}</Title>
      <div className='w-full'>
        <div className='flex justify-between px-1'>
          <p>Sesión</p>
          <p>Kilogramos</p>
          <p>Repeticiones</p>
        </div>
        {
          loading ? <p>Loading</p> : sessionsByDate.map((item, i) => {
            return <div key={i}>
              <ul className='bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4'>
                {
                  item.sessions.map((session: any, i: number) =>
                    <li key={i} className='flex justify-between'> <div className='bg-black rounded-full text-white font-bold aspect-square w-6 flex justify-center align-middle'>
                      <p className='text-center'>
                        {i + 1}
                      </p>
                    </div>
                      <p>{session.repetitions}</p>
                      <p>{session.weight}</p>
                    </li>)
                }
              </ul>
              <p className="text-center mt-3 font-semibold">{item.stringDate}</p>
            </div>
          })
        }
      </div>

      <div className='absolute bottom-4 flex justify-between align-middle w-[90%]'>
        <div className='flex flex-col shadow-md p-4 gap-2'>
          <label htmlFor="kilogramos">Kilogramos</label>
          <input
            type="number"
            className='p-2 bg-zinc-100 max-w-[100px] rounded-md'
            value={weight}
            onChange={(e) => setweight(parseInt(e.target.value))}
          />
        </div>
        <div className='flex flex-col shadow-md p-4 gap-2'>
          <label htmlFor="repetitions">Repetitions</label>
          <input
            type="number"
            className='p-2 bg-zinc-100 max-w-[100px] rounded-md'
            value={repetitions}
            onChange={(e) => setrepetitions(parseInt(e.target.value))}
          />
        </div>
        <button className='w-20 h-20 bg-black text-white font-bold self-center rounded-xl' onClick={handleAddSession}>+</button>
      </div>
    </div>
  )
}

export default ExercisePage