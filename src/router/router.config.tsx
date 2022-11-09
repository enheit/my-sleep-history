import { createHashRouter } from "react-router-dom";
import { MainLayout } from "../layout/main-layout";
import { Home } from "../routes/home/home";
import { NotFound } from "../routes/not-found/not-found";
import { Welcome } from "../routes/welcome/welcome";
import { PrivateRoute } from "./private-route";
import { PublicOnlyRoute } from "./public-only-route";

export const router = createHashRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ],
    },
    {
        path: "/welcome",
        element: <Welcome />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);