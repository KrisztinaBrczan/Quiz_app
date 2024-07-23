export default function GameResult({
  correctAnswerCount,
  gameQuestions,
  handlePlayAgain,
}) {
  const score = ((correctAnswerCount / gameQuestions.length) * 100).toFixed(2);

  return (
    <>
      <div className=" flex flex-col justify-center items-center min-h-screend">
        <div className="relative size-40">
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-current text-gray-200"
              stroke-width="2"
            ></circle>

            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={
                score <= 50
                  ? "stroke-current text-red-500"
                  : score <= 70
                  ? "stroke-current text-orange-500"
                  : "stroke-current text-green-500"
              }
              stroke-width="2"
              stroke-dasharray="100"
              stroke-dashoffset={100 - score}
              stroke-linecap="round"
            ></circle>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
            <span
              className={
                score <= 50
                  ? "text-center text-2xl font-bold text-red-500"
                  : score <= 70
                  ? "text-center text-2xl font-bold text-orange-500"
                  : "text-center text-2xl font-bold text-green-500"
              }
            >
              {score}%
            </span>

            <div
              className={
                score <= 50
                  ? " text-red-500"
                  : score <= 70
                  ? "text-orange-500"
                  : "text-green-500"
              }
            >
              {score <= 50
                ? "You can do better!"
                : score <= 70
                ? "Not bad!"
                : "Congratulations!"}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:border-orange-500"
            onClick={handlePlayAgain}
          >
            Play again
          </button>
          <button className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:border-green-500">
            Register result
          </button>
        </div>
      </div>
    </>
  );
}
