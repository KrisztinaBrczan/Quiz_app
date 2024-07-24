import { useEffect, useState } from "react";
import Header from "../Components/Header";
import readLeaderboard from "../Services/readLeaderboard";
import TableFilter from "../Components/TableFilter";
import Loader from "../Components/Loader";

export default function Leaderboard() {
  const [registeredResults, setRegisteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      readLeaderboard().then((results) => {
        const resultsWithIndex = results.map((result, idx) => ({
          ...result,
          index: idx + 1,
        }));
        setRegisteredResults(resultsWithIndex);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("An error occured during fetching data:", error);
    }
  }, []);

  console.log("registered results:", registeredResults);
  return (
    <>
      {/*  */}
      <Header />
      <div className="flex justify-center">
        <h1
          className="flex flex-col space-y-4 text-5xl text-center"
          style={{ padding: "1rem" }}
        >
          Leaderboard
        </h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TableFilter />
          <table id="example" className="table-auto w-full">
            <thead className="text-orange-500">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Player</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Percent</th>
                <th className="px-4 py-2">Time taken</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            {registeredResults.map(
              ({
                correctAnswer,
                date,
                id,
                percentage,
                questionAmount,
                time,
                username,
                index,
              }) => (
                <tbody>
                  <tr key={id}>
                    <td className="border px-4 py-2 text-gray-500">{index}</td>
                    <td className="border px-4 py-2 text-gray-500">
                      {username}
                    </td>
                    <td className="border px-4 py-2 text-gray-500">
                      {" "}
                      {correctAnswer}/{questionAmount}
                    </td>
                    <td className="border px-4 py-2 text-gray-500">
                      {percentage} %
                    </td>
                    <td className="border px-4 py-2 text-gray-500">{time}</td>
                    <td className="border px-4 py-2 text-gray-500">{date}</td>
                  </tr>
                </tbody>
              )
            )}
          </table>
        </div>
      )}
      {/*  */}
    </>
  );
}
