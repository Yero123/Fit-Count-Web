import FormSet from '@/components/FormSet';
import HistorialSection from '@/components/HistorialSection';
import SwitchExerciseView from '@/components/SwitchExerciseView';
import { LineChartExercise } from '@/components/charts/LineChartExercise';
import Title from '@/components/ui/Title';
import { getExercise } from '@/firebase/exercise.service';
import { addSession } from '@/firebase/sessions.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ExercisePage = () => {

  const [loading, setloading] = useState(false);
  const [view, setview] = useState("historial")
  const [exercise, setexercise] = useState<any>();
  const [sessionsByDate, setsessionsByDate] = useState<any>([]);
  const [data, setdata] = useState<any>({
    labels: [],
    data: []
  })
  const router = useRouter()
  useEffect(() => {
    setloading(true)
    if (!router.isReady) return;
    getExercise(router.query.idExercise as string).then((response) => {
      setexercise(response?.exercise);
      setdata(response?.data)
      setsessionsByDate(response?.sessionsByDate)
      setloading(false)
    });
  }, [router.isReady, router.query.idExercise,setloading])

  let data2 = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.data,
        borderColor: '#422AFB',
        backgroundColor: '#0e026d',
      },
    ],
  };
  const handleAddSession = async (repetitions:number, weight:number) => {
    setloading(true)
    addSession(exercise.id, { repetitions, weight, date: new Date() }).then(() => {
      setloading(false)
    })
  }

  return (
    <div className='px-8 py-6 flex flex-col '>
      <Title loading={loading}>{exercise?.name}</Title>
      <div className='w-full'>
        <SwitchExerciseView
          view={view}
          setview={setview}
        />
        {"historial" === view && <HistorialSection
          loading={loading}
          sessionsByDate={sessionsByDate}
        />}
        {"estadisticas" === view && <div className='h-[50vh]	flex pt-6'>

          <LineChartExercise data={data2} />
        </div>}
      </div>
      <FormSet loading={loading} setloading={setloading} exercise={exercise} handleAddSession={handleAddSession} />
    </div>
  )
}

export default ExercisePage

