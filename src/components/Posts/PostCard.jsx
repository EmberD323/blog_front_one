import { useEffect, useState } from "react";
import { Link,useOutletContext,useNavigate } from "react-router-dom";

export default function PostCard ({post}){
    const [posts,setPosts,token,setToken,edit,setEdit] = useOutletContext();

    const dateTime = new Date((Date.parse(post.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const value = crypto.randomUUID()
    const navigate = useNavigate()

    async function handlePostPublish(){

        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+post.id, {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({title:post.title,text:post.text,publish:"true"}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{//reload posts and leave edit page
            setEdit(!edit);
            navigate('../homepage');
        }

    }
    return (
        <li key={value}>
            <Link to={`../postpage/${post.id}`}>
                <div className="title">Title:{post.title}</div>
                <div className="author">Authorid(need name - todo):{post.userId}</div>
                <div className="date">Created: {dayMonthYear}</div>
                <div className="commentCount">Number of comments: {post.comments.length}</div>
                <div className="published">Published: {String(post.published)}</div>
                <button onClick={handlePostPublish}>Publish</button>

            </Link>
        </li>
    
    )
}


