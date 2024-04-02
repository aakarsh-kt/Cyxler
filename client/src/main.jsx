import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BookingPage from "./pages/bookingPage.jsx";
import "./index.css";
import Login from "./pages/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/app", element: <App /> },
  { path: "/register", element: <Register /> },
  // { path: "/app", element: <App /> },
  { path: `/booking`, element: <BookingPage /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
