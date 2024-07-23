import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function createLeaderboard(result) {
  const docRef = await addDoc(collection(db, "leaderboard"), result);
  return docRef.id;
}
