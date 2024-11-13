import { useEffect, useState } from "react";
import { useOutletContext,useParams } from "react-router-dom";


export default function PostPage (){
    const [posts,setPosts] = useOutletContext();
    const { id } = useParams();
    console.log(id)
    console.log(posts)

    return (
        <div>
            <div>Post Page</div>
        </div>
    
    )
}


