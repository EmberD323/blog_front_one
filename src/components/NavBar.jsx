import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="NavBar">
            <h1 className="heading">Blog Name</h1>
            <Link to="homepage">Home Page</Link>
            <Link to="otherpage">Other Page</Link>
            <div className="links">
                <a href="">Log in</a>
                <a href="">Sign up</a>
            </div>
        </div>
    )
}

export default NavBar;