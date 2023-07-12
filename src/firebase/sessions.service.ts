import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "./config";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';

export const addSession = async (idExercise: string, session: any) => {
  const collRef = collection(db, "users", USER_ID, "exercises", idExercise, "sessions")
  //add document session in firestore
  return await addDoc(collRef, session)

}