import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { getLastSessionsOnWeek } from "./sessions.service";
import { getSessionsFromExercise } from "./exercise.service";
import { USER_ID } from "@/utils/constants";


export const getMuscles = async () => {
    const collRef = collection(db, "users", USER_ID, "muscles")
    let muscles: any[] = [];
  console.log("fetch muscles");

    const querySnapshot = await getDocs(collRef);
    querySnapshot.forEach((doc:any) => {
        muscles.push({
        id: doc.id,
        name: doc.data().name,
        });
    });
    return muscles
}

export const createMuscle= async (name:string)=>{
    const docRef = await addDoc(collection(db, "users", USER_ID, "muscles"), {
        name
    });
    const doc = await getDoc(docRef);
    return {
        id: doc.id,
        ...doc.data()
    }
}