import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";
import { getLastSessionsOnWeek } from "./sessions.service";
import { getSessionsFromExercise } from "./exercise.service";
import { USER_ID } from "@/utils/constants";
export const getRutinesWithExercices = async () => {
  const collRef = collection(db, "users", USER_ID, "rutines");
  let rutines: any[] = [];
  const querySnapshot = await getDocs(collRef);
  querySnapshot.forEach(async (doc) => {
    rutines.push({
      id: doc.id,
      name: doc.data().name,
    });
  });
  const sessions = await getLastSessionsOnWeek();

  rutines = await Promise.all(
    rutines.map(async (rutine) => {
      let exercises = await getExerciseFromRutine(rutine.id);
      exercises.forEach((exercise: any) => {
        if (
          sessions.some((session: any) => session.idExercise == exercise.id)
        ) {
          exercise.active = true;
        } else {
          exercise.active = false;
        }
      });
      return {
        ...rutine,
        exercises,
      };
    })
  );
  return rutines;
};
export const getRutinesExercisesSessions = async () => {
  const rutines = await getRutinesWithExercices();
  await rutines.forEach(async (rutine: any) => {
    rutine.exercises.forEach(async (exercise: any) => {
      exercise.sessions = [];
      const sessions = await getSessionsFromExercise(exercise.id);
      if (sessions) {
        exercise.sessions = sessions;
      }
    });
  });
  return rutines;
};
export const getRutineTableData = async (id: string) => {};
export const getRutine = async (idRutine: string) => {
  const docRef = doc(db, "users", USER_ID, "rutines", idRutine);
  const docSnap = await getDoc(docRef);
  const sessions = await getLastSessionsOnWeek();
  if (docSnap.exists()) {
    let exercises = await getExerciseFromRutine(idRutine);
    exercises.forEach((exercise: any) => {
      if (sessions.some((session: any) => session.idExercise == exercise.id)) {
        exercise.active = true;
      } else {
        exercise.active = false;
      }
    });
    return {
      id: docSnap.id,
      name: docSnap.data().name,
      exercises,
    };
  } else return null;
};
export const getExerciseFromRutine = async (id: string) => {
  const collRef = collection(db, "users", USER_ID, "exercises");
  const q = query(collRef, where("idRutine", "==", id));
  const querySnapshot = await getDocs(q);
  let exercises: any[] = [];
  querySnapshot.forEach((doc) => {
    exercises.push({
      idRutine: doc.data().idRutine,
      name: doc.data().name,
      id: doc.id,
    });
  });
  return exercises;
};

export const createRutine = async (rutine: any) => {
  const docRef = collection(db, "users", USER_ID, "rutines");
  return await addDoc(docRef, {
    name: rutine,
  });
};
export const deleteRutine = async (id: string) => {
  const docRef = doc(db, "users", USER_ID, "rutines", id);
  return await deleteDoc(docRef);
};

export const updateRutine = async (id: string, rutine: any) => {
  const docRef = doc(db, "users", USER_ID, "rutines", id);
  return await updateDoc(docRef, rutine);
};

export const getRutines = async () => {
  const collRef = collection(db, "users", USER_ID, "rutines");
  let rutines: any[] = [];
  const querySnapshot = await getDocs(collRef);
  console.log("fetch rutines");

  querySnapshot.forEach((doc) => {
    rutines.push({
      id: doc.id,
      name: doc.data().name,
    });
  });
  return rutines;
};
