import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from './Page/Home.jsx';
import NewsDetail from './Page/NewsDetail.jsx';
import CategoricalNews from './Page/CategoricalNews.jsx';
import Login from './Page/Login.jsx';
import Signup from './Page/Signup.jsx';
import Dashboard from './Page/Dashboard.jsx'
import SavedNews from './Page/SavedNews.jsx';
import NewsManagement from './Page/NewsManagement.jsx'
import CreateNews from './Page/CreateNews.jsx'
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
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/saved",
        element: <SavedNews />
    },
    {
        path: "/manage",
        element: <NewsManagement />
    },
    {
        path: "/create",
        element: <CreateNews />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);