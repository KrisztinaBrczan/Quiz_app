import { useState, useEffect } from "react";
import Header from "../Components/Header";
import readQuiz from "../Services/readQuiz";
import measureTime from "../Utils/measureTime";
import GameResult from "../Components/GameResult";

export default function PlayQuiz() {
  const [gameCategory, setGameCategory] = useState("Geography");
  const [gameQuestions, setGameQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [userSelection, setUserSelection] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let interval;
    if (showGame) {
      interval = measureTime(setSeconds, setMinutes);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        setMinutes(0);
        setSeconds(0);
      }
    };
  }, [showGame]);

  async function handleGenerateGame(e) {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);
    setCorrectAnswerCount(0);

    try {
      let questions = await readQuiz(gameCategory);
      let randomQuestions = questions
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setGameQuestions(randomQuestions);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setShowGame(true);
  }
  console.log(gameQuestions);

  function handleNextQuestion(e) {
    e.preventDefault();
    if (questionIndex < 10) {
      setQuestionIndex(questionIndex + 1);
    }

    if (questionIndex >= 9) {
      setShowGame(false);
      setShowResult(true);
      setQuestionIndex(0);
    }

    if (
      userSelection.trim() === gameQuestions[questionIndex].correctAnswer.trim()
    ) {
      setCorrectAnswerCount(correctAnswerCount + 1);
    }
  }

  function handleGameExit(e) {
    e.preventDefault();
    setShowGame(false);
    setQuestionIndex(0);
    setCorrectAnswerCount(0);
    setShowResult(false);
  }

  console.log("a helyes válasz:", gameQuestions[questionIndex]?.correctAnswer);
  console.log("amit a user választott:", userSelection);
  console.log("helyes válaszok száma:", correctAnswerCount);

  return (
    <>
      <Header />
      <div
        className=" text-orange-500 flex justify-center gap-4"
        style={{ display: showResult ? "none" : "visible" }}
      >
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Geography"
            checked={gameCategory === "Geography"}
            onChange={(e) => setGameCategory(e.target.value)}
            disabled={showGame}
          />{" "}
          Geography
        </label>
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="History"
            checked={gameCategory === "History"}
            onChange={(e) => setGameCategory(e.target.value)}
            disabled={showGame}
          />{" "}
          History
        </label>
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Literature"
            checked={gameCategory === "Literature"}
            onChange={(e) => setGameCategory(e.target.value)}
            disabled={showGame}
          />{" "}
          Literature
        </label>
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Movies"
            checked={gameCategory === "Movies"}
            onChange={(e) => setGameCategory(e.target.value)}
            disabled={showGame}
          />{" "}
          Movies
        </label>
      </div>
      <div className="flex justify-center mt-9">
        <button
          onClick={handleGenerateGame}
          disabled={isLoading || showGame}
          className="text-orange-500 border-2 border-orange-600 hover:text-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:border-orange-500"
          style={{ display: showResult ? "none" : "visible" }}
        >
          {isLoading ? "Please wait..." : "Start!"}
        </button>
      </div>

      {showGame && (
        <div className="flex items-center justify-center">
          <div className="w-2/3 h-1/3 p-5">
            <div className="flex justify-between">
              <h1>Category: {gameCategory}</h1>
              <button className="text-orange-600" onClick={handleGameExit}>
                X
              </button>
            </div>

            <div key={gameQuestions[questionIndex].id}>
              <h1>Question {questionIndex + 1}/10</h1>

              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-orange-600 h-2.5 rounded-full"
                  style={{ width: `${((questionIndex + 1) / 10) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-left flex-col gap-4 ">
                <h2 className="text-orange-500 text-xl">
                  {gameQuestions[questionIndex].question}
                </h2>

                <div className="grid grid-cols-2 gap-4 p-4">
                  <label className="flex items-center p-4 border border-orange-500 rounded-lg shadow-md hover:border-orange-600 cursor-pointer transition bg-gray-800  hover: transition hover:bg-gradient-to-r from-gray-700 to-gray-800">
                    <input
                      type="radio"
                      name="answer"
                      className="form-radio text-orange-500 ring-2 ring-transparent focus:ring-orange-500 "
                      value={"answerA"}
                      onChange={(e) => setUserSelection(e.target.value)}
                    />
                    <span className="ml-2 text-white">
                      {gameQuestions[questionIndex].answerA}
                    </span>
                  </label>

                  <label className="flex items-center p-4 border border-orange-500 rounded-lg shadow-md hover:border-orange-600 cursor-pointer transition bg-gray-800  hover: transition hover:bg-gradient-to-r from-gray-700 to-gray-800">
                    <input
                      type="radio"
                      name="answer"
                      className="form-radio text-orange-500 ring-2 ring-transparent focus:ring-orange-500"
                      value={"answerB"}
                      onChange={(e) => setUserSelection(e.target.value)}
                    />
                    <span className="ml-2 text-white">
                      {gameQuestions[questionIndex].answerB}
                    </span>
                  </label>

                  <label className="flex items-center p-4 border border-orange-500 rounded-lg shadow-md hover:border-orange-600 cursor-pointer transition bg-gray-800  hover: transition hover:bg-gradient-to-r from-gray-700 to-gray-800">
                    <input
                      type="radio"
                      name="answer"
                      className="form-radio text-orange-500 ring-2 ring-transparent focus:ring-orange-500"
                      value={"answerC"}
                      onChange={(e) => setUserSelection(e.target.value)}
                    />
                    <span className="ml-2 text-white">
                      {gameQuestions[questionIndex].answerC}
                    </span>
                  </label>

                  <label className="flex items-center p-4 border border-orange-500 rounded-lg shadow-md hover:border-orange-600 cursor-pointer transition bg-gray-800  hover: transition hover:bg-gradient-to-r from-gray-700 to-gray-800">
                    <input
                      type="radio"
                      name="answer"
                      className="form-radio text-orange-500 ring-2 ring-transparent focus:ring-orange-500"
                      value={"answerD"}
                      onChange={(e) => setUserSelection(e.target.value)}
                    />
                    <span className="ml-2 text-white">
                      {gameQuestions[questionIndex].answerD}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-orange-500">
                {minutes} : {seconds}
              </div>
              <div>{correctAnswerCount}</div>
              <button
                onClick={handleNextQuestion}
                className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:border-orange-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {showResult && (
        <GameResult
          correctAnswerCount={correctAnswerCount}
          gameQuestions={gameQuestions}
        />
      )}
    </>
  );
}
