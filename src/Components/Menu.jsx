import { Link } from "react-router-dom";

export default function Menu() {
  return (
    // <div>
    //   <Link to="/play-quiz">Play Quiz</Link>
    //   <Link to="/create-quiz">Create Quiz</Link>
    //   <Link to="/leaderboard">Leaderboard</Link>
    // </div>

    // <div className="flex h-screen justify-center items-center">
    <nav className="w-64 bg-gray-800 p-4  flex h-screen w-screen  justify-center items-center">
      <div className="flex flex-col space-y-4 text-5xl">
        <Link to="/play-quiz" className="text-white hover:text-gray-300">
          Play Quiz
        </Link>
        <Link to="/create-quiz" className="text-white hover:text-gray-300">
          Create Quiz
        </Link>
        <Link to="/leaderboard" className="text-white hover:text-gray-300">
          Leaderboard
        </Link>
      </div>
    </nav>
    // </div>
  );
}
