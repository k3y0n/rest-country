import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Country from "../pages/Country";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/country/:name",
        element: <Country />,
    },
]);
