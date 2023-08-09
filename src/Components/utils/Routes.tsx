import { Route } from "react-router";
import Home from "../Dictionary/Home";
import Details from "../Dictionary/Details";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from "react";
const routes = createBrowserRouter([
  {
    children: [
      {
        path: "search",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
      {
        path: "*",
        element: <Navigate to="/search" replace />,
      },
    ],
  },
]);
export default routes;
