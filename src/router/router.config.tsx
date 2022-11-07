import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/main-layout";
import { Home } from "../routes/home/home";
import { NotFound } from "../routes/not-found/not-found";
import { Welcome } from "../routes/welcome/welcome";
import { PrivateRoute } from "./private-route";
import { PublicOnlyRoute } from "./public-only-route";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <PrivateRoute><Home /></PrivateRoute>
            },
        ],
    },
    {
        path: "/welcome",
        element: <PublicOnlyRoute><Welcome /></PublicOnlyRoute> 
    },
    {
        path: "*",
        element: <NotFound />
    }
]);