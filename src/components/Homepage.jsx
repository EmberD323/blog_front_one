import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import PostCards from "./PostCards";

export default function HomePage (){
    const [posts,setPosts,token,setToken] = useOutletContext();
    return (
        <div className="homepage">
            <h2>Blog Posts</h2>
            <PostCards posts={posts}></PostCards>
        </div>
    
    )
}


