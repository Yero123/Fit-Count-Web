import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';

export const addSession = async (idExercise: string, session: any) => {
  const collRef = collection(db, "users", USER_ID, "exercises", idExercise, "sessions")
  //add document session in firestore
  return await addDoc(collRef, session)

}

export const updateSession = async (idExercise: string, idSession: string, session: any) => {
  const docRef = doc(db, "users", USER_ID, "exercises", idExercise, "sessions", idSession)
  //update document session in firestore
  return await updateDoc(docRef,session)
}
export const deleteSession = async (idExercise: string, idSession: string) => {
  const docRef = doc(db, "users", USER_ID, "exercises", idExercise, "sessions", idSession)
  //delete document session in firestore
  return await deleteDoc(docRef)
}