import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/components/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./src/components/Error";
import Body from "./src/components/Body";
import Home from "./src/components/Home";
import Sample from "./src/components/Sample";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/home",
                element: <Home/>
            },
            {
                path: "/sample",
                element: <Sample/>
            }
        ],
        errorElement: <Error/>
    },


])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
