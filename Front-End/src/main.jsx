import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Main from "./components/Layout/Main.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Summarization from "./components/Summarization/Summarization.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if logged in
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/", // Login Page (Public)
    element: <Login />,
  },
  {
    path: "/signup", // Signup Page (Public)
    element: <SignUp />,
  },
  {
    path: "/", // Parent route for authenticated pages
    element: (
      <>
        <ScrollToTop /> {/*Ensures page scrolls to top on route change */}
        <ProtectedRoute element={<Main />} />
      </>
    ),
    children: [
      {
        index: true,
        path: "home",
        element: <ProtectedRoute element={<Home />} />,
      },
     
      {
        path: "summarize",
        element: <ProtectedRoute element={<Summarization />} />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
