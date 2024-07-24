import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function readLeaderboard() {
  const querySnapshot = await getDocs(collection(db, "leaderboard"));
  const registeredResults = [];
  querySnapshot.forEach((doc) => {
    registeredResults.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return registeredResults;
}
