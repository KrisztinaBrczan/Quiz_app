import { useState, useEffect } from "react";
import Header from "../Components/Header";
import readQuiz from "../Services/readQuiz";
import Loader from "../Components/Loader";
import { useSearchParams } from "react-router-dom";
import TableFilter from "../Components/TableFilter";
import Pagination from "../Components/Pagination";
import trashcanSVG from "../assets/trashcan.svg";
import pencilSVG from "../assets/pencil.svg";
import LockSvg from "../assets/lock.svg";
import deleteQuiz from "../Services/deleteQuiz";
import { Link } from "react-router-dom";

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

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (quizCategory === "Geography" && geographyQuestions.length === 0) {
          const questions = await readQuiz(quizCategory);
          setGeographyQuestions(questions);
        } else if (
          quizCategory === "History" &&
          historyQuestions.length === 0
        ) {
          const questions = await readQuiz(quizCategory);
          setHistoryQuestions(questions);
        } else if (
          quizCategory === "Literature" &&
          literatureQuestions.length === 0
        ) {
          const questions = await readQuiz(quizCategory);
          setLiteratureQuestions(questions);
        } else if (quizCategory === "Movies" && moviesQuestions.length === 0) {
          const questions = await readQuiz(quizCategory);
          setMoviesQuestions(questions);
        }
      } catch (error) {
        console.log("An error occurred during fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    setSearch("");
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

  function handleQuestionDelete(id, category, isDefault) {
    let userChoice;

    if (isDefault) {
      alert("Created by admin, cannot be deleted.");
      return;
    }

    if (!isDefault) {
      userChoice = confirm("Are you sure you want to delete this question?");
    }

    if (userChoice && category === "Geography") {
      deleteQuiz(category, id).then(() => {
        setGeographyQuestions(
          geographyQuestions.filter((question) => question.id !== id)
        );
      });
    }

    if (userChoice && category === "History") {
      deleteQuiz(category, id).then(() => {
        setHistoryQuestions(
          historyQuestions.filter((question) => question.id !== id)
        );
      });
    }

    if (userChoice && category === "Literature") {
      deleteQuiz(category, id).then(() => {
        setLiteratureQuestions(
          literatureQuestions.filter((question) => question.id !== id)
        );
      });
    }

    if (userChoice && category === "Movies") {
      deleteQuiz(category, id).then(() => {
        setMoviesQuestions(
          moviesQuestions.filter((question) => question.id !== id)
        );
      });
    }
  }

  function handleCategoryChange(category) {
    setQuizCategory(category);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  }

  return (
    <>
      <Header isAllQuestionPage={true} />
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            setSearch={setSearch}
            search={search}
          />
          <table id="example" className="table-auto w-full">
            <thead className="text-orange-500">
              <tr>
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2">Answer A</th>
                <th className="px-4 py-2">Answer B</th>
                <th className="px-4 py-2">Answer C</th>
                <th className="px-4 py-2">Answer D</th>
                <th className="px-4 py-2">Correct Answer</th>
                <th className="px-4 py-2 text-gray-800">.</th>
                <th className="px-4 py-2 text-gray-800">.</th>
              </tr>
            </thead>
            <tbody>
              {croppedResults
                .filter((currentQuiz) => {
                  return Object.values(currentQuiz).some((value) =>
                    value.toString().toLowerCase().includes(search)
                  );
                })
                .map(
                  (
                    {
                      id,
                      question,
                      answerA,
                      answerB,
                      answerC,
                      answerD,
                      correctAnswer,
                      isDefault,
                      category,
                    },
                    index
                  ) => (
                    <tr key={id}>
                      <td className="text-left px-4 py-2 text-gray-500 hover:text-orange-500 ">
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
                        {isDefault ? (
                          <img
                            className={"hover:cursor-not-allowed"}
                            src={LockSvg}
                            alt="pencil"
                          />
                        ) : (
                          <Link to={`/create-quiz/${id}/${category}/edit`}>
                            <img
                              className={"hover:cursor-pointer"}
                              src={pencilSVG}
                              alt="pencil"
                            />
                          </Link>
                        )}
                      </td>
                      <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500">
                        <img
                          className={`hover:${
                            isDefault ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                          src={trashcanSVG}
                          alt="trashcan"
                          onClick={() =>
                            handleQuestionDelete(id, category, isDefault)
                          }
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
        isLoading={isLoading}
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
