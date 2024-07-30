export default function CategoryChooser({
  showResult,
  category,
  handleCategoryChange,
  showGame,
}) {
  return (
    <>
      <div className={`flex justify-center ${showResult ? "hidden" : "flex"}`}>
        <div className="flex flex-col sm:flex-row sm:text-xl md:flex-row md:gap-4 lg:text-2xl gap-2">
          <label className="flex items-center space-x-2">
            <input
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="quiz-category"
              value="Geography"
              checked={category === "Geography"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={showGame}
            />
            <span>Geography</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="quiz-category"
              value="History"
              checked={category === "History"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={showGame}
            />
            <span>History</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="quiz-category"
              value="Literature"
              checked={category === "Literature"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={showGame}
            />
            <span>Literature</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="quiz-category"
              value="Movies"
              checked={category === "Movies"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={showGame}
            />
            <span>Movies</span>
          </label>
        </div>
      </div>
    </>
  );
}
