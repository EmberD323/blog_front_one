import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import PostCard from "./PostCard";

export default function HomePage (){
    const [posts,setPosts] = useOutletContext();

    // const [imageURL, setImageURL] = useState("");
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //     fetch("https://picsum.photos/550/550",{
    //         mode:"cors"
    //     })
    //     .then((response)=>setImageURL(response.url))
    //     .catch((error)=>setError(error))
    //     .finally(()=>setLoading(false));
    //    },[])
    
    // if(error) return <p>Error</p>
    // if(loading) return <p>Loading</p>
    // /- renders slowly use fetch instead
    return (
        <div className="homepage">
            <h2>Blog Posts</h2>
            <div>{posts}</div>
            <PostCard></PostCard>
            <PostCard></PostCard>

        </div>
    
    )
}


