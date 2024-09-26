import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import Card from "./app/card";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/item/:id", element: <Card />}
]);

export default router;
