import { Outlet } from "react-router";

function App() {
    return (
        <>
            <h1 className="font-giant-text">Hello World!</h1>
            <Outlet context={{ text: "Hello World!" }}></Outlet>
        </>
    );
}

export default App;
