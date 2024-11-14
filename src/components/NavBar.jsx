import { Link,useNavigate} from "react-router-dom";

function NavBar({token,setToken}) {
    const navigate = useNavigate()
    function handleLogout(){
        setToken(null);
        localStorage.removeItem("token");
        navigate('../');
    }
    if(typeof token == "object"){
        return (
            <div className="NavBar">
                <h1 className="heading">Blog Name</h1>
                <Link to="homepage">Home Page</Link>
                <div className="links">
                    <Link to="login">Log in</Link>
                    <Link to="signup">Sign up</Link>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="NavBar">
                <h1 className="heading">Blog Name</h1>
                <Link to="homepage">Home Page</Link>
                <div className="links">
                    <div onClick={handleLogout}>Log out</div>
                </div>
            </div>
        )
        

    }
}

export default NavBar;