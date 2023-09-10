import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { getExercise } from "./exercise.service";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';

export const addSession = async (idExercise: string, session: any) => {
  const collRef = collection(db, "users", USER_ID, "sessions")
  //add document session in firestore
  return await addDoc(collRef, { ...session, idExercise })

}

export const updateSession = async (idExercise: string, idSession: string, session: any) => {
  const docRef = doc(db, "users", USER_ID, "sessions", idSession)
  //update document session in firestore
  return await updateDoc(docRef, session)
}
export const deleteSession = async (idExercise: string, idSession: string) => {
  const docRef = doc(db, "users", USER_ID, "sessions", idSession)
  //delete document session in firestore
  return await deleteDoc(docRef)
}
export const getLastSessionsOnWeek = async () => {
  // actual mondayDay at 00:00 
  const mondayDay = new Date().getTime() - ((((new Date().getDay()) == 0 ? 8 : new Date().getDay()) - 1) * 86400000)
  //ver 
  const q = query(collection(db, "users", USER_ID, "sessions"), where("date", ">", new Date(mondayDay)))
  const querySnapshot = await getDocs(q);
  const sessions: any = [];
  querySnapshot.forEach((doc) => {
    sessions.push({ ...doc.data(), id: doc.id })
  });
  //dias de la semana
  const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //sessions by day
  const sessionsByDay: any = [];
  days.forEach((day) => {
    const sessionsByDayAux = sessions.some((session: any) => {
      //timestamp to date
      const nuevaFecha = new Date(session.date.seconds * 1000)
      return nuevaFecha.getDay() == days.indexOf(day)
    })
    sessionsByDay.push(sessionsByDayAux)
  })

  return sessionsByDay;

}
export const passSessions = async () => {
  //get rutines
  const rutines = await getDocs(collection(db, "users", USER_ID, "exercises"))

  rutines.docs.forEach(async (rutine) => {
    console.log("rutine", rutine, "id", rutine.id)
    const idExercise = rutine.id;
    const exercise = await getExercise(idExercise);
    console.log(exercise)
    //createSessions in firestore
    const collRef = collection(db, "users", USER_ID, "sessions")
    //@ts-ignore
    exercise?.exercise?.sessions?.forEach(async (session: any) => {
      console.log(session)
      await addDoc(collRef, {
        repetitions: session.repetitions,
        weight: session.weight,
        date: session.date,
        idExercise: idExercise
      })
    })

  })

}