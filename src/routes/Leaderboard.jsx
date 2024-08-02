import { useEffect, useState } from "react";
import Header from "../Components/Header";
import readLeaderboard from "../Services/readLeaderboard";
import TableFilter from "../Components/TableFilter";
import Loader from "../Components/Loader";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
import Footer from "../Components/Footer";

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

  function handlePageChange(newPage) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(newPage));
    setSearchParams(newSearchParams);
  }
  function handlePerPageChange(e) {
    const newPerPage = e.target.value;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("perPage", String(newPerPage));
    newSearchParams.set("page", "1"), setSearchParams(newSearchParams);
  }

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <h1 className="text-3xl flex flex-col space-y-4 md:text-5xl text-center">
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
          <table id="example" className="w-full">
            <thead className="text-orange-500">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Player</th>
                <th className="px-4 py-2 hidden sm:table-cell">Category</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2 hidden sm:table-cell">Percent</th>
                <th className="px-4 py-2">Time taken</th>
                <th className="px-4 py-2 hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {croppedResults.map(
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
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden sm:table-cell">
                      {category}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {" "}
                      {correctAnswer}/{questionAmount}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden sm:table-cell">
                      {percentage} %
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {minutes}:{seconds}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden sm:table-cell">
                      {date}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        isLoading={isLoading}
        page={Number(page)}
        perPage={Number(perPage)}
        registeredResultsLength={registeredResults.length}
        handlePageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}
