import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

function App() {
    return <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>;
}

export default App;
