import { collection, query, where, getDocs, doc, getDoc, orderBy, addDoc, updateDoc } from "firebase/firestore";
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
      sessions: sessions?.sort((a, b) => {
        //sort by date
        return a.date.seconds - b.date.seconds
      })
    }

    let arrayByDate: { stringDate: string, sessions: any[] }[] = []
    let labels1: any[] = [];
    let data1: any[] = [];
    if (sessions) {
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
    }
    return {
      exercise,
      sessionsByDate: arrayByDate.reverse(),
      data: {
        labels: labels1,
        data: data1
      }
    }

  }
  else
    return null
}

export const getSessionsFromExercise = async (id: string) => {

  const collRef = collection(db, "users", USER_ID, "sessions")
  //where exerciseId == id
  const q = query(collRef, where("idExercise", "==", id));
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

export const createExercise = async (exercise: any, idRutine: any) => {
  const docRef = collection(db, "users", USER_ID, "exercises");

  const exerciseCreated = await addDoc(docRef, {
    name: exercise,
    idRutine: idRutine
  });
  const rutine = await getDoc(doc(db, "users", USER_ID, "rutines", idRutine))
  let exercises = [];
  if (rutine?.data()?.exercises) {
    exercises = rutine.data()?.exercises.push(exerciseCreated.id)
  }
  await updateDoc(doc(db, "users", USER_ID, "rutines", idRutine), {
    exercises: exercises
  })
  return exerciseCreated;
}