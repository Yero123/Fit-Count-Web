import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { db } from "./config";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';
export const getExercise = async (id: string) => {
  const docRef = doc(db, "users", USER_ID, "exercises", id);
  const docSnap = await getDoc(docRef);
  const sessions = await getSessionsFromExercise(id)
  if (docSnap.exists()) {
    let exercise = {
      id: docSnap.id,
      name: docSnap.data().name,
      idRutine: docSnap.data().idRutine,
      sessions: sessions
    }
    if(!sessions) return null
    let arrayByDate: { stringDate: string, sessions: any[] }[] = []
    let labels1: any[] = [];
    let data1: any[] = [];
    exercise.sessions?.forEach((session: any, i: any) => {
      labels1.push(i + 1)
      let power = session.weight * session.repetitions
      if (session.weight == 0) {
        power = 0.5 * session.repetitions
      }
      data1.push(power)
      let stringDate = new Date(session.date.seconds * 1000).toLocaleDateString('en-GB')
      let actualDate = arrayByDate.find((item) => item.stringDate === stringDate)
      if (actualDate) {
        actualDate.sessions = [...actualDate.sessions, session]
      } else {
        arrayByDate.push({ sessions: [session], stringDate })
      }
    });
    return {
      exercise,
      sessionsByDate: arrayByDate.reverse(),
      data:{
        labels: labels1,
        data: data1
      }
    }

  }
  else
    return null
}

export const getSessionsFromExercise = async (id: string) => {

  const collRef = collection(db, "users", USER_ID, "exercises", id, "sessions")
  const q = query(collRef, orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);
  let sessions: any[] = [];
  if (querySnapshot.empty) return null
  querySnapshot.forEach((doc) => {
    sessions.push({
      repetitions: doc.data().repetitions,
      date: doc.data().date,
      weight: doc.data().weight,
      id: doc.id,
    })
  });
  return sessions
}