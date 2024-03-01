import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState, } from "react";
import { getExercise } from '@/firebase/exercise.service';
import { addSession, deleteSession, updateSession } from '@/firebase/sessions.service';
export const DoExerciseContext = createContext<any>(null);
export default function DoExerciseProvider(props: any) {
  const [loading, setloading] = useState(false);
  const [view, setview] = useState("historial")
  const [exercise, setexercise] = useState<any>();
  const [refresh, setrefresh] = useState(false)
  const [sessionsByDate, setsessionsByDate] = useState<any>([]);
  const [date, setdate] = useState<Date>(new Date());
  const [data, setdata] = useState<any>({
    labels: [],
    data: []
  })
  const [sessionEditID, setsessionEditID] = useState<string>("");
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
  }, [router.isReady, router.query.idExercise, refresh])

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
  const handleAddSession = async () => {
    setloading(true)
    addSession(exercise.id, { repetitions, weight, date: new Date() }).then(() => {
      setloading(false)
      setrefresh(!refresh)
    })
  }
  const handleEditSession = async () => {
    setloading(true)
    updateSession(exercise.id, sessionEditID as string, { repetitions, weight, date }).then(() => {
      setloading(false)
      setrefresh(!refresh)
      setinEditMode(false)
      setsessionEditID("")
    })
  }
  const handleDeleteSession = async () => {
    setloading(true)
    deleteSession(exercise.id, sessionEditID as string).then(() => {
      setloading(false)
      setrefresh(!refresh)
    })
  }
  const [repetitions, setrepetitions] = useState(0);
  const [weight, setweight] = useState(0)
  const handleChangeRepetitions = (e: any) => { setrepetitions(parseInt(e.target.value)) }
  const handleChangeWeight = (e: any) => { setweight(parseInt(e.target.value)) }
  const [inEditMode, setinEditMode] = useState(false)
  const value = {
    loading, view, setview, sessionsByDate, data2, setloading, exercise, handleAddSession, handleChangeRepetitions, handleChangeWeight, weight, repetitions,
    sessionEditID,
    setsessionEditID,
    inEditMode, setinEditMode,
    setweight,
    setrepetitions,handleEditSession,
    handleDeleteSession,
    setdate,
    date
  }
  return (
    <DoExerciseContext.Provider value={value}>
      {props.children}
    </DoExerciseContext.Provider>
  );

}

export const useExerciseContext = () => {
  const context = useContext<any>(DoExerciseContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}