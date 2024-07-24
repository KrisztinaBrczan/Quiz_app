import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase/init";

export default async function readLeaderboard() {
  let q = query(
    collection(db, "leaderboard"),
    orderBy("correctAnswer", "desc"),
    orderBy("minutes", "asc"),
    orderBy("seconds", "asc")
  );
  const querySnapshot = await getDocs(q);

  const registeredResults = [];

  querySnapshot.forEach((doc) => {
    registeredResults.push({ id: doc.id, ...doc.data() });
  });

  return registeredResults;
}
