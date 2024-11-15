import { useEffect, useState } from "react";
import { Link,useNavigate,useOutletContext } from "react-router-dom";

export default function CommentCard ({comment,post}){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const dateTime = new Date((Date.parse(comment.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const navigate = useNavigate()

   
    async function handleCommentEdit(){
        //navigate to edit
        navigate('../postpage/'+post.id+'/commentedit/'+comment.id);
        
    }
    async function handleCommentDelete(){
        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+post.id+"/comments/"+comment.id, {
            method: "DELETE",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
        }); 
        console.log(response)
        if(response.status == 200){//succesful
            setEdit(!edit);
            navigate('../postpage/'+post.id);
        }
        else{
            console.log(await response.json())
        }
    }
    return (
        <li key={crypto.randomUUID()}>
                <div className="author">Authorid(need name - todo):{comment.userId}</div>
                <div className="date">Created: {dayMonthYear} @ {time}</div>
                <div className="text"> {comment.text}</div>
                <button onClick={handleCommentEdit}>Edit</button>
                <button onClick={handleCommentDelete}>Delete</button>
        </li>
    
    )
}


