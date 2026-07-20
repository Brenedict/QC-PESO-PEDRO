import { Outlet } from "react-router";

function App() {
    return (
        <>
            <h1 className="text-6xl text-yellow-300 font-black">
                Hello World!
            </h1>
            <Outlet context={{ text: "Hello World!" }}></Outlet>
        </>
    );
}

export default App;
