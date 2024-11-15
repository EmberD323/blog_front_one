import { useOutletContext,useNavigate } from "react-router-dom";

import PostCards from "./Posts/PostCards";

export default function HomePage (){
    const [posts,setPosts,token,setToken,edit,setEdit] = useOutletContext();

    const navigate = useNavigate()
    function handleNewPost() {
        navigate('../newpost');
    }

    return (
        <div className="homepage">
            <button onClick={handleNewPost}>Create Blog Post</button>
            <h2>Blog Posts</h2>
            <PostCards posts={posts}></PostCards>
            
        </div>
    
    )
}


