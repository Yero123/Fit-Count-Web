import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { db } from "./config";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';
export const getExercise = async (id: string) => {
  const docRef = doc(db, "users", USER_ID, "exercises", id);
  const docSnap = await getDoc(docRef);
  const sessions = await getSessionsFromExercise(id)
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      name: docSnap.data().name,
      idRutine: docSnap.data().idRutine,
      sessions: sessions
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