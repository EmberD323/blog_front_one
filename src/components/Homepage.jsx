import { useOutletContext } from "react-router-dom";
import PostCards from "./Posts/PostCards";
import Login from './Users/Login.jsx';

export default function HomePage (){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    if(typeof token == "object"){
        return(
                <Login></Login>
        )
    }
    if(posts==null){
        return
    }
    return (
        <div className="homepage">
            <h2>All Posts</h2>
            <PostCards posts={posts}></PostCards>
        </div>
    )
}


