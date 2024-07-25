import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import CreateQuiz from "./routes/CreateQuiz";
import Leaderboard from "./routes/Leaderboard";
import PlayQuiz from "./routes/PlayQuiz";
import AllQuizQuestions from "./routes/AllQuizQuestions";
import Home from "./routes/Home";
import UpdateQuiz from "./routes/UpdateQuiz";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-quiz",
        element: <CreateQuiz />,
      },

      {
        path: "/create-quiz/:quizId/:category/edit",
        element: <UpdateQuiz />,
      },

      {
        path: "/all-quiz-questions",
        element: <AllQuizQuestions />,
      },
      {
        path: "/play-quiz",
        element: <PlayQuiz />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
