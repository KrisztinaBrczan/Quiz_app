import { useState } from "react";
import createQuiz from "../Services/createQuiz";
import warningSvg from "../assets/warning.svg";
import Header from "../Components/Header";
import { useNavigate } from "react-router";
import updateQuiz from "../Services/updateQuiz";
import Footer from "../Components/Footer";

const initialQuizValues = {
  question: "",
  category: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
  correctAnswer: "",
  isDefault: true,
};

export default function CreateQuiz({ isUnderUpdating, quizToAmend }) {
  const [formData, setFormData] = useState(quizToAmend || initialQuizValues);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleClearForm(e) {
    e.preventDefault();
    setFormData(initialQuizValues);
    setError({});
  }

  async function handleQuizCreation(e) {
    e.preventDefault();

    const formValidationErrors = {};
    if (formData.category === "") {
      formValidationErrors.category = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    if (!formData.question.trim()) {
      formValidationErrors.question = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    if (!formData.answerA.trim()) {
      formValidationErrors.answerA = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    if (!formData.answerB.trim()) {
      formValidationErrors.answerB = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    if (!formData.answerC.trim()) {
      formValidationErrors.answerC = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    if (!formData.answerD.trim()) {
      formValidationErrors.answerD = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    if (formData.correctAnswer === "") {
      formValidationErrors.correctAnswer = (
        <img src={warningSvg} alt="Warning Icon" />
      );
    }
    setError(formValidationErrors);

    if (Object.keys(formValidationErrors).length === 0) {
      setIsLoading(true);

      if (quizToAmend)
        await updateQuiz(formData.category, quizToAmend.id, formData);
      if (!quizToAmend) await createQuiz(formData.category, formData);
      setFormData(initialQuizValues);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Header />

      <div className="flex justify-center">
        <h1
          className="flex flex-col space-y-4 text-5xl text-center"
          style={{ padding: "1rem" }}
        >
          {isUnderUpdating ? "Update question" : "Create quiz"}
        </h1>
      </div>

      <form
        // className="max-w-md mx-auto "
        className="max-w-md mx-auto p-4 sm:p-6 lg:p-8"
        noValidate
        onSubmit={handleQuizCreation}
      >
        <div className="relative z-0 w-full mb-5 group ">
          <label htmlFor="underline_select" className="sr-only">
            Underline select
          </label>
          <select
            id="underline_select"
            className=" block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            disabled={isLoading}
          >
            <option selected value=""></option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
            <option value="Movies">Movies</option>
          </select>
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Category
          </label>
          {error.category && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.category}
            </span>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_text"
            id="floating_text"
            className="block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            required
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            disabled={isLoading}
          />

          <label
            htmlFor="floating_text"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Question
          </label>

          {error.question && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.question}
            </span>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="repeat_text"
            id="floating_repeat_text"
            className="block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            required
            value={formData.answerA}
            onChange={(e) =>
              setFormData({ ...formData, answerA: e.target.value })
            }
            disabled={isLoading}
          />
          <label
            htmlFor="floating_repeat_text"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Answer A
          </label>

          {error.answerA && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.answerA}
            </span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="repeat_text"
            id="floating_repeat_text"
            className="block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            required
            value={formData.answerB}
            onChange={(e) =>
              setFormData({ ...formData, answerB: e.target.value })
            }
            disabled={isLoading}
          />
          <label
            htmlFor="floating_repeat_text"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Answer B
          </label>

          {error.answerB && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.answerB}
            </span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="repeat_text"
            id="floating_repeat_text"
            className="block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            required
            value={formData.answerC}
            onChange={(e) =>
              setFormData({ ...formData, answerC: e.target.value })
            }
            disabled={isLoading}
          />
          <label
            htmlFor="floating_repeat_text"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Answer C
          </label>

          {error.answerC && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.answerC}
            </span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="repeat_text"
            id="floating_repeat_text"
            className="block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            placeholder=" "
            required
            value={formData.answerD}
            onChange={(e) =>
              setFormData({ ...formData, answerD: e.target.value })
            }
            disabled={isLoading}
          />
          <label
            htmlFor="floating_repeat_text"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Answer D
          </label>

          {error.answerD && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.answerD}
            </span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="underline_select" className="sr-only">
            Underline select
          </label>
          <select
            id="underline_select"
            className="block py-2.5 px-0 w-full font-bold text-sm text-orange-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
            value={formData.correctAnswer}
            onChange={(e) =>
              setFormData({ ...formData, correctAnswer: e.target.value })
            }
            disabled={isLoading}
          >
            <option selected value="">
              {/* Choose the correct answer... */}
            </option>
            <option value="answerA">
              {formData.answerA ? `Answer A (${formData.answerA})` : "Answer A"}
            </option>
            <option value="answerB">
              {formData.answerB ? `Answer B (${formData.answerB})` : "Answer B"}
            </option>
            <option value="answerC">
              {formData.answerC ? `Answer C (${formData.answerC})` : "Answer C"}
            </option>
            <option value="answerD">
              {formData.answerD ? `Answer D (${formData.answerD})` : "Answer D"}
            </option>
          </select>
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Correct answer
          </label>

          {error.correctAnswer && (
            <span className="absolute right-0 top-0 mt-5 mr-0">
              {error.correctAnswer}
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <button
            type="button"
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={
              isUnderUpdating
                ? () => navigate("/all-quiz-questions")
                : handleClearForm
            }
            disabled={isLoading}
          >
            {isUnderUpdating ? "Discard" : "Clear"}
          </button>
          <button
            type="submit"
            className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:border-orange-500"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
      {/*  */}
      <div
        className="flex justify-center "
        style={{ display: isUnderUpdating ? "none" : "flex" }}
      >
        <button
          onClick={() => navigate("/all-quiz-questions")}
          className="text-orange-500 border-2 border-orange-600 hover:text-orange-600 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:focus:border-orange-500"
        >
          List questions
        </button>
      </div>
      <Footer />
    </>
  );
}
