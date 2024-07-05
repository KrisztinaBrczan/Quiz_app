import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function deleteQuiz(collectionName, id) {
  await deleteDoc(doc(db, `${collectionName}`, id));
}
