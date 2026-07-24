import Button from "./components/Button";
import { GeneralInput } from "./components/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function App() {
    return (
        <>
            {/* <Outlet context={{ text: "Hello World!" }}></Outlet> */}
            <div className="w-100 p-10">
                <GeneralInput type="email" id="emailAddress" name="emailAddress" placeholder="Enter your email here">
                    QC Government Email
                </GeneralInput>
                <Button>
                    Hello World!
                    <SearchOutlinedIcon />{" "}
                </Button>
            </div>
        </>
    );
}

export default App;
