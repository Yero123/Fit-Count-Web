import { getRutines, getRutinesExercisesSessions } from "@/firebase/rutine.service";
import { getDaysWorkedByWeek, getSessionsByRange } from "@/firebase/sessions.service";
import { Rutine, Session } from "@/models";
import Rutines from "@/pages/rutines";
import { getCurrentMondayDate, getRangeWeek } from "@/utils/functions";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState, } from "react";

export const AllRutinesContext = createContext<any>(null);
export default function AllRutinesProvider(props: any) {
  const [rutines, setrutines] = useState<Rutine[]>([]);
  const [loading, setloading] = useState(false);
  const [reportWeek, setreportWeek] = useState([false, false, false, false, false, false, false]);
  const [re, setre] = useState(false);
  const [rutinesAll, setrutinesAll] = useState<Rutine[]>([]);
  const [lastsSessions, setlastsSessions] = useState<Session[]>([]);
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
    getRutinesExercisesSessions().then((rutines) => {
      setrutinesAll(rutines)
    })
  }, [])  

  const reset = () => { setre(!re) }
  const getDataFormRutineTable =  ():{
    name: string;
    link: string;
    status: string;
    lastModification: string;
    progress: number;
}[] => {
    return rutinesAll.map((rutine) => {
      let status = "No iniciado"
      let lastModification = "No encontrado"
      let progress = 0
      let maxSessions=16;
      let totalSessions=0;
  
      const currentDate = getCurrentMondayDate();
      rutine.exercises.forEach((exercise) => {
        if (exercise.sessions) {
          exercise.sessions.forEach((session) => {
            if (session.date.seconds > currentDate.getTime() / 1000) {
              status = "En progreso"
              totalSessions++
              
            }
            if(session.date.seconds>lastModification || lastModification=="No encontrado"){
              lastModification = new Date(session.date.seconds*1000).toLocaleDateString('en-GB')
            }
          })
        }
      })
      progress = (totalSessions/maxSessions)*100
      if(progress>=100){
        status="Completado"
      }
      return {
        name: rutine.name,
        link: `/rutines/${rutine.id}`,
        status: status,
        lastModification: lastModification,
        progress: progress
      }
    })
  }
  const getDataFromExerciseTable = ()=>{
    let data:any[] = []
    rutinesAll.forEach((rutine) => {
      rutine.exercises.forEach((exercise) => {
        let status = "No iniciado"
        let lastModification = "No encontrado"
        let lastModification2 = "No encontrado"
        let progress = 0
        let maxSessions=16;
        let totalSessions=0;
        let range1:any;
        let range2:any;
        let record1=0;
        let record2=0;
        if (exercise.sessions) {
          if(exercise.id=="8MmaQZSrP7EWZuwsDbut"){

          }
          exercise.sessions.sort((a, b) => {
            return   b.date.seconds - a.date.seconds
          }).forEach((session) => {
            const dateSession=new Date(session.date.seconds*1000);
           
            const [start, end] = getRangeWeek(dateSession)
            if(range1==undefined){
              range1=[start, end]
            }
            if(exercise.id=="8MmaQZSrP7EWZuwsDbut"){
        
            }
            if( range1[0]==start && range1[1]==end){
              record1=record1 + session.weight*session.repetitions
              if(exercise.id=="8MmaQZSrP7EWZuwsDbut"){

              }
            }else{
              if(range2==undefined){
                range2=[start, end]
              }
              if(range2[0]==start && range2[1]==end){
                record2= record2 + session.weight*session.repetitions
              }
            }
            
            
          
          })
        }
        progress = (totalSessions/maxSessions)*100
        data.push({
          name: exercise.name,
          link: `/exercises/${exercise.id}`,
          record1: record1,
          record2: record2,
          })
      })
    })
    return data
  }
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

  const saveCustomRutineLocalStorage = () => {
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
    checkExercise,getDataFormRutineTable,
    getDataFromExerciseTable
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

