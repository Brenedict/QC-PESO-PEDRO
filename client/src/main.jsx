import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import routes from "./routes.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    </StrictMode>
);
