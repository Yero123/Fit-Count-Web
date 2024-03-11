import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";
import { getLastSessionsOnWeek } from "./sessions.service";
import { getSessionsFromExercise } from "./exercise.service";
const USER_ID = 'pg04fNCoICxrRKjcfZuH';


export const getMuscles = async () => {
    const collRef = collection(db, "users", USER_ID, "muscles")
    let muscles: any[] = [];
    const querySnapshot = await getDocs(collRef);
    querySnapshot.forEach((doc) => {
        muscles.push({
        id: doc.id,
        name: doc.data().name,
        });
    });
    return muscles
}