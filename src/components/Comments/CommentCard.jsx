import { useEffect, useState } from "react";
import { Link,useNavigate,useOutletContext } from "react-router-dom";

export default function CommentCard ({comment,post}){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const dateTime = new Date((Date.parse(comment.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const thisAuthor = users.filter((user)=>user.id == post.userId)[0];
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
        <li key={crypto.randomUUID()} className="commentCard">
            <div className="buttons">
                <button onClick={handleCommentEdit}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/0a2463/edit--v1.png" alt="edit--v1"/></button>
                <button onClick={handleCommentDelete}><img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/0a2463/filled-trash.png" alt="filled-trash"/></button>
            </div>
            <div className="text"> {comment.text}</div>
            <div className="authorAndDate">
                <div className="author">{thisAuthor.first_name} {thisAuthor.last_name}</div>
                <div className="date"> {dayMonthYear} @ {time}</div>
            </div>
            
                
        </li>
    
    )
}


