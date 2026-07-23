import App from "./App";
import Contacts from "./pages/Contacts";
import About from "./pages/About";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <About></About> },
            { path: "contacts", element: <Contacts></Contacts> },
        ],
    },
];

export default routes;
