import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Link onClick={(e) => navigate("/")}>
        <div className="text-orange-500 flex items-center h-14 mx-4">Menu</div>
      </Link>
    </>
  );
}
