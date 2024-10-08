import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import CreatePollPage from "./pages/create-poll";
import ViewResultsPage from "./pages/view-results";
import PollProvider from "./context/poll-context";
import ViewPollsPage from "./pages/view-polls";
import { Toaster } from "sonner";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AuthProvider from "./context/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "create-poll",
        element: <CreatePollPage />,
      },
      {
        path: "view-results",
        element: <ViewResultsPage />,
      },
      {
        path: "/",
        element: <ViewPollsPage />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <PollProvider>
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
      </PollProvider>
    </AuthProvider>
  </React.StrictMode>
);
