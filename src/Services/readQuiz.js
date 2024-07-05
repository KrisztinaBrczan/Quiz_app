import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function readQuiz(collectionName) {
  const querySnapshot = await getDocs(collection(db, `${collectionName}`));
  const quizQuestions = [];
  querySnapshot.forEach((doc) => {
    quizQuestions.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return quizQuestions;
}
