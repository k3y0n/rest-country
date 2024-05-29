import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Country from "../pages/Country";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/country/:name",
        element: <Country />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
