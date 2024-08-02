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
import CategoryChooser from "../Components/CategoryChooser";
import Footer from "../Components/Footer";

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

  const questionCategories = {
    Geography: geographyQuestions,
    History: historyQuestions,
    Literature: literatureQuestions,
    Movies: moviesQuestions,
  };

  const setQuestionFunctions = {
    Geography: setGeographyQuestions,
    History: setHistoryQuestions,
    Literature: setLiteratureQuestions,
    Movies: setMoviesQuestions,
  };

  useEffect(() => {
    setQuizCategory(searchParams.get("category") || "Geography");
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (questionCategories[quizCategory].length === 0) {
          const questions = await readQuiz(quizCategory);
          setQuestionFunctions[quizCategory](questions);
        }
      } catch (error) {
        console.log("An error occurred during fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    setSearch("");

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", quizCategory);
    setSearchParams(newSearchParams);
  }, [quizCategory]);

  useEffect(() => {
    setPage(searchParams.get("page") || "1");
    setPerPage(searchParams.get("perPage") || "10");

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", quizCategory);
    setSearchParams(newSearchParams);
  }, [searchParams]);

  useEffect(() => {
    if (search !== "") {
      setPage("1");

      setPerPage("10");

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", "1");
      newSearchParams.set("perPage", "10");

      setSearchParams(newSearchParams);
    }
  }, [search]);

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  function getFilteredResults() {
    if (search !== "") {
      return questionCategories[quizCategory].filter((currentQuiz) => {
        return Object.values(currentQuiz).some((value) =>
          value.toString().toLowerCase().includes(search)
        );
      });
    }
    return questionCategories[quizCategory];
  }

  const filteredResults = getFilteredResults();
  const croppedResults = filteredResults.slice(start, end);

  console.log("Jelenlegi croppedresult", croppedResults);

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
    newSearchParams.set("page", "1");

    setSearchParams(newSearchParams);
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

    if (userChoice) {
      deleteQuiz(category, id).then(() => {
        setQuestionFunctions[category](
          questionCategories[category].filter((question) => question.id !== id)
        );
      });
    }
  }

  function handleCategoryChange(category) {
    console.log(category);
    setQuizCategory(category);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");

    setSearchParams(newSearchParams);
  }

  console.log(
    `Na ezek lettek: page: ${page}, perPage: ${perPage}, totál oldal: ${
      filteredResults.length / perPage
    }`
  );

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

      <CategoryChooser
        category={quizCategory}
        handleCategoryChange={handleCategoryChange}
      />

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
            //
            setPerPage={setPerPage}
          />
          <table id="example" className="table-auto w-full">
            <thead className="text-orange-500">
              <tr>
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2 hidden lg:table-cell">Answer A</th>
                <th className="px-4 py-2 hidden lg:table-cell">Answer B</th>
                <th className="px-4 py-2 hidden lg:table-cell">Answer C</th>
                <th className="px-4 py-2 hidden lg:table-cell">Answer D</th>
                <th className="px-4 py-2 ">Correct Answer</th>
                <th className="px-4 py-2 text-gray-800">.</th>
                <th className="px-4 py-2 text-gray-800">.</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {croppedResults.map(
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
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden lg:table-cell">
                      {answerA}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden lg:table-cell">
                      {" "}
                      {answerB}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden lg:table-cell">
                      {answerC}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 hidden lg:table-cell">
                      {answerD}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-500 hover:text-orange-500 ">
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
        registeredResultsLength={filteredResults.length}
        handlePageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}
