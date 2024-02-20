import { getRutines } from "@/firebase/rutine.service";
import { getDaysWorkedByWeek, getSessionsByRange } from "@/firebase/sessions.service";
import { Rutine, Session } from "@/models";
import Rutines from "@/pages/rutines";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState, } from "react";

export const AllRutinesContext = createContext<any>(null);
export default function AllRutinesProvider(props: any) {
  const [rutines, setrutines] = useState<Rutine[]>([]);
  const [loading, setloading] = useState(false);
  const [reportWeek, setreportWeek] = useState([false, false, false, false, false, false, false]);
  const [re, setre] = useState(false);
  const reset = () => { setre(!re) }
  console.log(rutines)
  const [lastsSessions, setlastsSessions] = useState<Session[]>([]);
  // const [weeks, setweeks] = useState(second)
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
  useEffect(() => {
    if (rutines.length > 0) {
      let fechaActual = new Date();
      let tiempoTresSemanasAtras = fechaActual.getTime() - (21 * 24 * 60 * 60 * 1000);
      let fechaTresSemanasAtras = new Date(tiempoTresSemanasAtras);
      getSessionsByRange(fechaTresSemanasAtras, new Date()).then((sessions: Session[]) => {
        const newRutines = rutines;
        sessions.forEach((session) => {
          const idRutine = findRutineBySession(session, rutines)?.id
          if (idRutine) {
            newRutines.find((rutine) => rutine.id === idRutine)?.exercises.find((exercise) => {
              if (exercise.id === session.idExercise) {
                if (!exercise.sessions) {
                  exercise.sessions = []
                }
                exercise.sessions?.push(session)
              }
            })
          }
        })
        console.log(rutines, newRutines)
        setrutines(newRutines)
        setlastsSessions(sessions)

      })
    }
  }, [rutines])
  const findRutineBySession = (sesion: Session, rutines: Rutine[]) => {
    let rutine = rutines.find((rutine) => {
      return rutine.exercises.find((exercise) => {
        return exercise.id === sesion.idExercise
      })
    })
    return rutine
  }
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