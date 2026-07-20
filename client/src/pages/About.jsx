import { useOutletContext } from "react-router";
import { Link } from "react-router";

function About() {
    const { text } = useOutletContext();

    return (
        <>
            <p>About us: fjdsapfjaofdajp {text}</p>
            <Link to="/contacts">Go To Contacts</Link>
        </>
    );
}

export default About;
