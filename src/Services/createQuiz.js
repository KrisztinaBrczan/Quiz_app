import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function createQuiz(collectionName, quiz) {
  const docRef = await addDoc(collection(db, `${collectionName}`), quiz);
  return docRef.id;
}
