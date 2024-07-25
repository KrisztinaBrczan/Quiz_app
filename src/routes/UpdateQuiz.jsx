import { useParams } from "react-router";
import Header from "../Components/Header";
import CreateQuiz from "./CreateQuiz";

export default function UpdateQuiz() {
  const { todoId } = useParams();
  return (
    <>
      <CreateQuiz isUnderUpdating={true} />
    </>
  );
}
