import { useParams } from "react-router";

import CreateQuiz from "./CreateQuiz";
import { useEffect, useState } from "react";
import readCurrentQuiz from "../Services/readCurrentQuiz";

export default function UpdateQuiz() {
  const { quizId } = useParams();
  const { category } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    readCurrentQuiz(category, quizId).then(setFormData);
    console.log(formData);
  }, []);

  return (
    <>
      {formData.question && (
        <CreateQuiz
          isUnderUpdating={true}
          quizToAmend={{ id: quizId, ...formData }}
        />
      )}
    </>
  );
}
