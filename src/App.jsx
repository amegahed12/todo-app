import React from "react";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Navbar from "./Components/Navbar";
import Dashbaord from "./pages/Dashbaord";
import RootLayout from "./layouts/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AuthGuard from "./HOCs/AuthGuard";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import { Bounce, ToastContainer } from "react-toastify";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/create",
          element: <CreateProduct />,
        },
        {
          path: "/products/:id",
          element: <CreateProduct />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          Component: Dashbaord,
          children: [
            {
              index: true,
              path: "settings",
              element: (
                <AuthGuard>
                  <h1>Settings</h1>
                  <h2>Settings For Website</h2>
                </AuthGuard>
              ),
            },
            { path: "profile", element: <h1>Profile</h1> },
          ],
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
      />
      <RouterProvider router={router} />
    </div>
  );
}
