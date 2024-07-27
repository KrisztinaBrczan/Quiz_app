export default function CategoryChooser({
  showResult,
  category,
  handleCategoryChange,
  showGame,
}) {
  return (
    <>
      <div
        className=" text-orange-500 flex justify-center gap-4"
        style={{ display: showResult ? "none" : "flex" }}
      >
        <label>
          <input
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="radio"
            name="quiz-category"
            value="Geography"
            checked={category === "Geography"}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            checked={category === "History"}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            checked={category === "Literature"}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
            checked={category === "Movies"}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={showGame}
          />{" "}
          Movies
        </label>
      </div>
    </>
  );
}
