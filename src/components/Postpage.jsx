import { useEffect, useState } from "react";
import { useOutletContext,useParams,useNavigate } from "react-router-dom";


export default function PostPage (){
    const [posts,setPosts,token,setToken] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    const dateTime = new Date((Date.parse(thisPost.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const navigate = useNavigate()
    //current: edit button. on click pop up form 
    function handlePostEdit(){
        navigate('../postedit/'+id);
    }

    return (
        <div>
            <h2 className="title">Title:{thisPost.title}</h2>
            <div className="imgPlaceholder">Image Placeholder</div>
            <div className="author">Authorid(need name - todo):{thisPost.userId}</div>
            <div className="date">Created: {dayMonthYear} @ {time}</div>
            <div className="published">Published: {String(thisPost.published)}</div>
            <button onClick={handlePostEdit}>Edit</button>
            <button>Delete</button>
            <button>Publish</button>


        </div>
    
    )
}


