import { useState, useEffect } from "react";
import Header from "../Components/Header";
import readQuiz from "../Services/readQuiz";
import Loader from "../Components/Loader";
import { useSearchParams } from "react-router-dom";
import TableFilter from "../Components/TableFilter";
import Pagination from "../Components/Pagination";
import trashcanSVG from "../assets/trashcan.svg";

export default function AllQuizQuestions() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizCategory, setQuizCategory] = useState("Geography");
  const [geographyQuestions, setGeographyQuestions] = useState([]);
  const [historyQuestions, setHistoryQuestions] = useState([]);
  const [literatureQuestions, setLiteratureQuestions] = useState([]);
  const [moviesQuestions, setMoviesQuestions] = useState([]);

  const [isSearchFielNecessary, setIsSearchFieldNecessary] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [perPage, setPerPage] = useState(searchParams.get("perPage") || "10");

  useEffect(() => {
    try {
      setIsLoading(true);

      if (quizCategory === "Geography" && geographyQuestions.length === 0) {
        readQuiz(quizCategory).then((questions) => {
          setGeographyQuestions(questions);
        });
      } else if (quizCategory === "History" && historyQuestions.length === 0) {
        readQuiz(quizCategory).then((questions) => {
          setHistoryQuestions(questions);
        });
      } else if (
        quizCategory === "Literature" &&
        literatureQuestions.length === 0
      ) {
        readQuiz(quizCategory).then((questions) => {
          setLiteratureQuestions(questions);
        });
      } else if (quizCategory === "Movies" && moviesQuestions.length === 0) {
        readQuiz(quizCategory).then((questions) => {
          setMoviesQuestions(questions);
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("An error occured during fetching data:", error);
    }
  }, [quizCategory]);

  useEffect(() => {
    setPage(searchParams.get("page") || "1");
    setPerPage(searchParams.get("perPage") || "10");
  }, [searchParams]);

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const croppedResults =
    quizCategory === "Geography"
      ? geographyQuestions.slice(start, end)
      : quizCategory === "History"
      ? historyQuestions.slice(start, end)
      : quizCategory === "Literature"
      ? literatureQuestions.slice(start, end)
      : quizCategory === "Movies"
      ? moviesQuestions.slice(start, end)
      : [];

  console.log("croppedresults ", croppedResults);

  function handlePageChange(newPage) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(newPage));
    setSearchParams(newSearchParams);
  }
  function handlePerPageChange(e) {
    const newPerPage = e.target.value;
    console.log("newPerpage:", newPerPage);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("perPage", String(newPerPage));
    newSearchParams.set("page", "1"), setSearchParams(newSearchParams);
  }

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <h1
          className="flex flex-col space-y-4 text-5xl text-center"
          style={{ padding: "1rem" }}
        >
          All quiz questions
        </h1>
      </div>
      {/*  */}
      <div className=" text-orange-500 flex justify-center gap-4">
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Geography"
            checked={quizCategory === "Geography"}
            onChange={(e) => setQuizCategory(e.target.value)}
          />{" "}
          Geography
        </label>
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="History"
            checked={quizCategory === "History"}
            onChange={(e) => setQuizCategory(e.target.value)}
          />{" "}
          History
        </label>
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Literature"
            checked={quizCategory === "Literature"}
            onChange={(e) => setQuizCategory(e.target.value)}
          />{" "}
          Literature
        </label>
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Movies"
            checked={quizCategory === "Movies"}
            onChange={(e) => setQuizCategory(e.target.value)}
          />{" "}
          Movies
        </label>
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
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2">Answer A</th>
                <th className="px-4 py-2">Answer B</th>
                <th className="px-4 py-2">Answer C</th>
                <th className="px-4 py-2">Answer D</th>
                <th className="px-4 py-2">Correct Answer</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {croppedResults.map(
                ({
                  id,
                  question,
                  answerA,
                  answerB,
                  answerC,
                  answerD,
                  correctAnswer,
                  isDefault,
                }) => (
                  <tr key={id}>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {id}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {question}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {answerA}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {" "}
                      {answerB}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {answerC}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {answerD}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      {correctAnswer}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      <span className="hover:cursor-pointer">cerka</span>
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                      <img
                        className="hover:fill-orange-600 hover:cursor-pointer"
                        src={trashcanSVG}
                        alt="trashcan"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        page={Number(page)}
        perPage={Number(perPage)}
        registeredResultsLength={
          quizCategory === "Geography"
            ? geographyQuestions.length
            : quizCategory === "History"
            ? historyQuestions.length
            : quizCategory === "Literature"
            ? literatureQuestions.length
            : quizCategory === "Movies"
            ? moviesQuestions.length
            : 0
        }
        handlePageChange={handlePageChange}
      />
    </>
  );
}
