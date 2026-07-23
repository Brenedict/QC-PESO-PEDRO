import { useOutletContext } from "react-router";
import { Link } from "react-router";

interface ContextType {
    text: string
}

function About() {
    const { text } = useOutletContext<ContextType>();

    return (
        <>
            <p>About us: fjdsapfjaofdajp {text}</p>
            <Link to="/contacts">Go To Contacts</Link>
        </>
    );
}

export default About;
