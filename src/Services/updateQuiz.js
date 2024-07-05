import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function updateQuiz(collectionName, id, newTodoData) {
  await updateDoc(doc(db, `${collectionName}`, id), newTodoData);
  return { id, ...newTodoData };
}
