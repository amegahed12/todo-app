import React from "react";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import AuthGuard from "./HOCs/AuthGuard";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/todos",
          element: (
            <AuthGuard>
              <Todos />
            </AuthGuard>
          ),
        },
        { path: "*", Component: NotFoundPage },
      ],
    },
  ]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="dark:bg-gray-800 dark:text-white"
        bodyClassName="dark:bg-gray-800 dark:text-white"
      />
      <RouterProvider router={router} />
    </div>
  );
}
