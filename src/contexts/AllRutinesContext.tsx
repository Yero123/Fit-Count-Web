import { getRutines } from "@/firebase/rutine.service";
import { getDaysWorkedByWeek } from "@/firebase/sessions.service";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState, } from "react";

export const AllRutinesContext = createContext<any>(null);
export default function AllRutinesProvider(props: any) {
  const [rutines, setrutines] = useState<any[]>([]);
  const [loading, setloading] = useState(false);
  const [reportWeek, setreportWeek] = useState([false, false, false, false, false, false, false]);
  const [re, setre] = useState(false);
  const reset = () => { setre(!re) }
  useEffect(() => {
    setloading(true)
    getRutines().then((rutines) => {
      setrutines(rutines);
      setloading(false)
    });
    getDaysWorkedByWeek().then((e) => {
      setreportWeek(e)
    });
  }, [re])
  console.log("reportWeek", reportWeek)
  const [customRutine, setcustomRutine] = useState<any>({
    name: "Today Rutine",
    exercises: [],
    id: "dasdaskaoksdhfas"
  });
  useEffect(() => {
    //get custom rutine from localstorage
    const customRutine = localStorage.getItem('customRutine')
    if (customRutine) {
      setcustomRutine(JSON.parse(customRutine))
    }

  }, [])
  const saveCustomRutineLocalStorage = () => {
    console.log("customRutine", customRutine)
    localStorage.setItem('customRutine', JSON.stringify(customRutine))
  }
  const checkExercise = (exercise: any) => {
    if (customRutine.exercises.find((e: any) => e.id === exercise.id)) {
      setcustomRutine({
        ...customRutine,
        exercises: customRutine.exercises.filter((e: any) => e.id !== exercise.id)
      })
      return
    }
    setcustomRutine({
      ...customRutine,
      exercises: [...customRutine.exercises, exercise]
    })

  }
  const value = {
    rutines,
    loading,
    reportWeek,
    re,
    reset,
    customRutine,
    saveCustomRutineLocalStorage,
    checkExercise
  }
  return (
    <AllRutinesContext.Provider value={value}>
      {props.children}
    </AllRutinesContext.Provider>
  );

}

export const useAllRutinesContext = () => {
  const context = useContext<any>(AllRutinesContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}