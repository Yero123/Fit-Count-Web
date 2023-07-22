import { LineChartExercise } from '@/components/charts/LineChartExercise';
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

  const [loading, setloading] = useState(false);
  const [view, setview] = useState("historial")
  const [exercise, setexercise] = useState<any>();
  const [sessionsByDate, setsessionsByDate] = useState<any[]>([]); // [ {id: '1', kilogramos: 10, repeticiones: 12}
  const [data, setdata] = useState<any>({
    labels: [],
    data: []
  })
  const router = useRouter()
  console.log(exercise)
  useEffect(() => {
    if (!router.isReady) return;
    getExercise(router.query.idExercise as string).then((rutine: any) => {
      setexercise(rutine);
      let arrayByDate: { stringDate: string, sessions: any[] }[] = []
      let labels1: any[] = [];
      let data1: any[] = [];
      rutine?.sessions.forEach((session: any,i:any) => {
        labels1.push(i+1)
        let power = session.weight * session.repetitions
        if(session.weight==0){
          power=0.5*session.repetitions
        }
        data1.push(power)
        let stringDate = new Date(session.date.seconds * 1000).toLocaleDateString('en-GB')
        console.log(new Date(session.date.seconds * 1000).toLocaleDateString())
        let actualDate = arrayByDate.find((item) => item.stringDate === stringDate)
        if (actualDate) {
          actualDate.sessions = [...actualDate.sessions, session]
        } else {
          arrayByDate.push({ sessions: [session], stringDate })
        }
      });
      setdata(
        {
          labels: labels1,
          data: data1
        }
      )
      setsessionsByDate(arrayByDate.reverse())
    });
  }, [router.isReady, loading])
  console.log(sessionsByDate)
  console.log(view)

  const styleButtonActive = "bg-secondary w-1/2 rounded-xl py-1"
  const styleButtonInactive = "w-1/2 rounded-xl py-1"
  const styleTextActive = "text-primary-text text-center font-medium "
  const styleTextInactive = "text-center font-medium text-gray-light"

  // const labels = [""];
  let data2 = {
    labels:data.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.data,
        borderColor: '#422AFB',
        backgroundColor: '#0e026d',
      },
    ],
  };


  return (
    <div className='px-8 py-6 flex flex-col '>
      <Title >{exercise?.name}</Title>
      <div className='w-full'>
        <div className='bg-white p-2 flex justify-between rounded-xl'>
          <button className={view === "historial" ? styleButtonActive : styleButtonInactive}
            onClick={() => { setview("historial") }}
          >
            <p className={view === "historial" ? styleTextActive : styleTextInactive}>Historial</p>
          </button>
          <button
            className={view === "estadisticas" ? styleButtonActive : styleButtonInactive}
            onClick={() => {
              console.log("asdsa")
              setview("estadisticas")
            }}
          >
            <p
              className={view === "estadisticas" ? styleTextActive : styleTextInactive}
            >Estadisticas</p>
          </button>
        </div>

        {"historial" === view && <HistorialSection
          loading={loading}
          sessionsByDate={sessionsByDate}
        />}
        {"estadisticas" === view && <div className='h-[50vh]	flex pt-6'>

          <LineChartExercise data={data2} />
        </div>}
      </div>
      <FormSet loading={loading} setloading={setloading} exercise={exercise} />
    </div>
  )
}

export default ExercisePage

const FormSet = ({
  loading,
  setloading,
  exercise,
}: any) => {
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
  return <div className='absolute bottom-4 flex justify-between align-middle w-[90%]'>
    <div className='flex flex-col shadow-md p-4 gap-2 bg-white'>
      <label htmlFor="kilogramos">Kilogramos</label>
      <input
        type="number"
        className='p-2 bg-zinc-100 max-w-[100px]  bg-tertiary rounded-lg border-2 border-secondary'
        value={weight}
        onChange={(e) => setweight(parseInt(e.target.value))}
      />
    </div>
    <div className='flex flex-col shadow-md p-4 gap-2 bg-white'>
      <label htmlFor="repetitions">Repetitions</label>
      <input
        type="number"
        className='p-2 bg-zinc-100 max-w-[100px]  bg-tertiary rounded-lg border-2 border-secondary'
        value={repetitions}
        onChange={(e) => setrepetitions(parseInt(e.target.value))}
      />
    </div>
    <button className='w-20 h-20 bg-primary text-white font-bold self-center rounded-xl' onClick={handleAddSession}>+</button>
  </div>
}

const HistorialSection = ({
  loading,
  sessionsByDate,
}: any) => {



  return <>
    <div className='flex justify-between px-1 mt-6 mb-4'>
      <p className='font-semibold'>Sesión</p>
      <p className='font-semibold'>Kilogramos</p>
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
  </>
}