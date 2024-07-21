import { useState } from "react";
import Header from "../Components/Header";
import readQuiz from "../Services/readQuiz";

export default function PlayQuiz() {
  const [gameCategory, setGameCategory] = useState("Geography");
  const [gameQuestions, setGameQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerateGame(e) {
    e.preventDefault();
    setIsLoading(true);

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
  }
  console.log(gameQuestions);

  return (
    <>
      <Header />
      <div className=" text-orange-500 flex justify-center gap-4">
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Geography"
            checked={gameCategory === "Geography"}
            onChange={(e) => setGameCategory(e.target.value)}
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
          />{" "}
          Movies
        </label>
      </div>
      <div className="flex justify-center mt-9">
        <button
          onClick={handleGenerateGame}
          disabled={isLoading}
          className="text-orange-500 border-2 border-orange-600 hover:text-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:border-orange-500"
        >
          {isLoading ? "Please wait..." : "Generate!"}
        </button>
      </div>
    </>
  );
}
