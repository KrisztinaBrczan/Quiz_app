import Header from "../Components/Header";
import Menu from "../Components/Menu";

export default function AllQuizQuestions() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <h1
          className="flex flex-col space-y-4 text-5xl text-center"
          style={{ padding: "1rem" }}
        >
          All quiz questions
        </h1>
      </div>
    </>
  );
}
