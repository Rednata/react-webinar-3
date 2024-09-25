import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import CardLayout from "./components/card-layout";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/item/:id", element: <CardLayout />}
]);

export default router;
