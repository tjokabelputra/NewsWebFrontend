import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from './components/Home.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import CategoricalNews from './components/CategoricalNews.jsx';
import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/news/:newsid",
        element: <NewsDetail />
    },
    {
        path: "/category/:category",
        element: <CategoricalNews />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);