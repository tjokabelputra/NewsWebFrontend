import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from './components/Home.jsx';
import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />
    },
    {
        path: "/home",
        element: <Home />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);