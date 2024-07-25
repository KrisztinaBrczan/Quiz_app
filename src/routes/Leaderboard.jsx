import { useEffect, useState } from "react";
import Header from "../Components/Header";
import readLeaderboard from "../Services/readLeaderboard";
import TableFilter from "../Components/TableFilter";
import Loader from "../Components/Loader";
import { useSearchParams } from "react-router-dom";

export default function Leaderboard() {
  const [registeredResults, setRegisteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFielNecessary, setIsSearchFieldNecessary] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [perPage, setPerPage] = useState(searchParams.get("perPage") || "10");

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

  useEffect(() => {
    setPage(searchParams.get("page") || "1");
    setPerPage(searchParams.get("perPage") || "10");
  }, [searchParams]);

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const croppedResults = registeredResults.slice(start, end);

  function handlePerPageChange(e) {
    const newPerPage = e.target.value;
    console.log("newPerpage:", newPerPage);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("perPage", String(newPerPage));
    newSearchParams.set("page", "1"), setSearchParams(newSearchParams);
  }

  function handlePageChange(newPage) {
    const newSearchParams = URLSearchParams(searchParams);
    newSearchParams.set("page", String(newPage));
    setSearchParams(newSearchParams);
  }

  console.log(croppedResults);

  return (
    <>
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
          <TableFilter
            isSearchFielNecessary={isSearchFielNecessary}
            perPage={perPage}
            handlePerPageChange={handlePerPageChange}
          />
          <table id="example" className="table-auto w-full">
            <thead className="text-orange-500">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Player</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Percent</th>
                <th className="px-4 py-2">Time taken</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {registeredResults.map(
                ({
                  correctAnswer,
                  date,
                  id,
                  percentage,
                  questionAmount,
                  username,
                  index,
                  category,
                  minutes,
                  seconds,
                }) => (
                  <tr key={id}>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {index}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {username}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {category}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {" "}
                      {correctAnswer}/{questionAmount}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {percentage} %
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {minutes}:{seconds}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {date}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {/*  */}
    </>
  );
}
