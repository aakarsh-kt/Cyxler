import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BookingPage from "./pages/bookingPage.jsx";
import "./index.css";
import Login from "./pages/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register.jsx";
import Chat from "./pages/chat.jsx";
import Groups from "./pages/Groups.jsx"
import Inbox from "./pages/Inbox.jsx";
import Forum from "./pages/Forum.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/app", element: <App /> },
  { path: "/register", element: <Register /> },
  { path: "/app/booking/chat", element: <Chat /> },
  { path: `/app/booking`, element: <BookingPage /> },
  { path: `/inbox`, element: <Inbox /> },
  { path: `/forum`, element: <Forum /> },
  { path: `/groups`, element: <Groups /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(

    <RouterProvider router={router} />

);
