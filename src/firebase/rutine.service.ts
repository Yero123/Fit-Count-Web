import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "./config";
import { getLastSessionsOnWeek } from "./sessions.service";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';
export const getRutines = async () => {
  const collRef = collection(db, "users", USER_ID, "rutines")
  let rutines: any[] = [];
  const querySnapshot = await getDocs(collRef);
  querySnapshot.forEach(async (doc) => {
    rutines.push({
      id: doc.id,
      name: doc.data().name,
    });
  });
  const sessions = await getLastSessionsOnWeek();

  rutines = await Promise.all(rutines.map(async (rutine) => {
    let exercises = await getExerciseFromRutine(rutine.id);
    exercises.forEach((exercise: any) => {
      if (sessions.some((session: any) => session.idExercise == exercise.id)) {
        exercise.active = true
      } else {
        exercise.active = false
      }
    })
    return {
      ...rutine,
      exercises
    }
  }))
  return rutines
}

export const getRutine = async (idRutine: string) => {
  const docRef = doc(db, "users", USER_ID, "rutines", idRutine);
  const docSnap = await getDoc(docRef);
  const sessions = await getLastSessionsOnWeek();
  if (docSnap.exists()) {
    let exercises = await getExerciseFromRutine(idRutine);
    exercises.forEach((exercise: any) => {
      if (sessions.some((session: any) => session.idExercise == exercise.id)) {
        exercise.active = true
      } else {
        exercise.active = false
      }
    })
    return {
      id: docSnap.id,
      name: docSnap.data().name,
      exercises
    }
  }
  else
    return null

}
export const getExerciseFromRutine = async (id: string) => {
  const collRef = collection(db, "users", USER_ID, "exercises")
  const q = query(collRef, where("idRutine", "==", id));
  const querySnapshot = await getDocs(q);
  let exercises: any[] = [];
  querySnapshot.forEach((doc) => {
    exercises.push({
      idRutine: doc.data().idRutine,
      name: doc.data().name,
      id: doc.id
    })
  });
  return exercises
}

export const createRutine = async (rutine: any) => {
  const docRef = collection(db, "users", USER_ID, "rutines");
  return await addDoc(docRef, {
    name: rutine
  });
}