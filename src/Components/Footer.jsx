import githubSVG from "../assets/github.svg";

export default function Footer() {
  return (
    <>
      <div className="fixed bottom-0 right-0 p-4">
        <a
          href="https://github.com/KrisztinaBrczan/Quiz_app"
          className="  hover:cursor-pointer flex justify-end"
        >
          <img src={githubSVG} alt="github-logo" />
        </a>
      </div>
    </>
  );
}
