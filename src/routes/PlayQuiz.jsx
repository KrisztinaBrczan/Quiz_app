import Header from "../Components/Header";

export default function PlayQuiz() {
  return (
    <>
      <Header />
      <div className="choose-category">
        <label>
          <input type="radio" name="quiz-category" value="geography" />{" "}
          Geography
        </label>
        <label>
          <input type="radio" name="quiz-category" value="history" /> History
        </label>
        <label>
          <input type="radio" name="quiz-category" value="literature" />{" "}
          Literature
        </label>
        <label>
          <input type="radio" name="quiz-category" value="movies" /> Movies
        </label>
      </div>
    </>
  );
}
