import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="w-64 bg-gray-800 p-4 flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col space-y-4 text-2xl p-7 xl:text-3xl xl:space-y-5 ">
        <Link
          to="/play-quiz"
          className="text-white rounded-lg bg-orange-500 hover:bg-orange-600 text-center p-3 w-80 shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Play Quiz
        </Link>
        <Link
          to="/create-quiz"
          className="text-white rounded-lg bg-orange-500 hover:bg-orange-600 text-center p-3 w-80 shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Create Quiz
        </Link>
        <Link
          to="/leaderboard"
          className="text-white rounded-lg bg-orange-500 hover:bg-orange-600 text-center p-3 w-80 shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}
