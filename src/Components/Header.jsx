import { Link, useNavigate } from "react-router-dom";

export default function Header({ isAllQuestionPage }) {
  const navigate = useNavigate();
  return (
    <>
      <div className=" text-orange-500 hover:text-orange-600 flex justify-between items-center h-14 px-4 w-full">
        <Link onClick={(e) => navigate("/")}>
          <span>Menu</span>
        </Link>
        <Link to={"/create-quiz"}>
          {isAllQuestionPage ? <span>Create</span> : ""}
        </Link>
      </div>
    </>
  );
}
