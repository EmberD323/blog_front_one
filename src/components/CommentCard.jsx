import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function CommentCard ({comment,post}){
    const dateTime = new Date((Date.parse(comment.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const navigate = useNavigate()

   
    async function handleCommentEdit(){
        //navigate to edit
        navigate('../postpage/'+post.id+'/commentedit/'+comment.id);
        
    }
    async function handleCommentDelete(){
        // const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+id, {
        //     method: "DELETE",
        //     mode:"cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "authorization": "Bearer " +token
        //     },
        // }); 
        // if(response.status == 200){//succesful
        //     setEdit(!edit);
        //     navigate('../homepage');
        // }
        // else{
        //     console.log(response)
        // }
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


