import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from './components/Home.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import CategoricalNews from './components/CategoricalNews.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx'
import SavedNews from './components/SavedNews.jsx';
import NewsManagement from './components/NewsManagement.jsx'
import CreateNews from './components/CreateNews.jsx'
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