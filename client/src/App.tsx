import { GeneralInput } from "./components/Input";

function App() {
    return (
        <>
            {/* <Outlet context={{ text: "Hello World!" }}></Outlet> */}
            <div className="w-100 p-10">
                <GeneralInput type="email" id="emailAddress" name="emailAddress" placeholder="Enter your email here">
                    QC Government Email
                </GeneralInput>
            </div>
        </>
    );
}

export default App;
