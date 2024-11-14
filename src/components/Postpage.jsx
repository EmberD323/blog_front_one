import { useEffect, useState } from "react";
import { useOutletContext,useParams,useNavigate } from "react-router-dom";


export default function PostPage (){
    const [posts,setPosts,token,setToken,,edit,setEdit] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    const dateTime = new Date((Date.parse(thisPost.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const navigate = useNavigate()
    //current: edit button. on click pop up form 
    async function handlePostEdit(){
        //navigate to edit
        navigate('../postedit/'+id);
        
    }
    if(typeof token == "object"){
        return (
            <div>
                <h2 className="title">Title:{thisPost.title}</h2>
                <div className="imgPlaceholder">Image Placeholder</div>
                <div className="author">Authorid(need name - todo):{thisPost.userId}</div>
                <div className="date">Created: {dayMonthYear} @ {time}</div>
                <div className="title">Text:{thisPost.text}</div>
            </div>
        )
    }
    return (
        <div>
            <h2 className="title">Title:{thisPost.title}</h2>
            <div className="imgPlaceholder">Image Placeholder</div>
            <div className="author">Authorid(need name - todo):{thisPost.userId}</div>
            <div className="date">Created: {dayMonthYear} @ {time}</div>
            <div className="published">Published: {String(thisPost.published)}</div>
            <div className="title">Text:{thisPost.text}</div>

            <button onClick={handlePostEdit}>Edit</button>
            <button>Delete</button>
            <button>Publish</button>
        </div>
    
    )
}


