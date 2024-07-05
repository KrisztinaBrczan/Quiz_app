import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function readCurrentQuiz(collectionName, id) {
  const quizToAmend = await getDoc(doc(db, `${collectionName}`, id));
  return quizToAmend.data();
}
