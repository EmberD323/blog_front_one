import { useEffect, useState } from "react";
import { useOutletContext,useParams,useNavigate } from "react-router-dom";
import CommentCards from "../Comments/CommentCards";

export default function PostPage (){
    const [posts,setPosts,token,setToken,edit,setEdit] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    const dateTime = new Date((Date.parse(thisPost.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const navigate = useNavigate()
    async function handlePostEdit(){
        //navigate to edit
        navigate('../postedit/'+id);
        
    }
    async function handlePostDelete(){
        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+id, {
            method: "DELETE",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
        }); 
        if(response.status == 200){//succesful
            setEdit(!edit);
            navigate('../homepage');
        }
        else{
            console.log(response)
        }
    }
    async function handlePostPublish(){

        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+id, {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({title:thisPost.title,text:thisPost.text,publish:"true"}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{//reload posts and leave edit page
            setEdit(!edit);
            navigate('../postpage/'+id);
        }

        
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
    else if(thisPost.published == true){
        return(
        <div>
            <h2 className="title">Title:{thisPost.title}</h2>
            <div className="imgPlaceholder">Image Placeholder</div>
            <button onClick={handlePostEdit}>Edit</button>
            <button onClick={handlePostDelete}>Delete</button>
            <div className="author">Authorid(need name - todo):{thisPost.userId}</div>
            <div className="date">Created: {dayMonthYear} @ {time}</div>
            <div className="published">Published: {String(thisPost.published)}</div>
            <div className="title">Text:{thisPost.text}</div>
            <h2 className="title">Comments:</h2>
            <div className="commentCount">Number of comments: {thisPost.comments.length}</div>
            <CommentCards comments={thisPost.comments} post={thisPost}></CommentCards>
            
        </div>
        )
    }
    return (
        <div>
            <h2 className="title">Title:{thisPost.title}</h2>
            <div className="imgPlaceholder">Image Placeholder</div>
            <button onClick={handlePostEdit}>Edit</button>
            <button onClick={handlePostDelete}>Delete</button>
            <button onClick={handlePostPublish}>Publish</button>
            <div className="author">Authorid(need name - todo):{thisPost.userId}</div>
            <div className="date">Created: {dayMonthYear} @ {time}</div>
            <div className="published">Published: {String(thisPost.published)}</div>
            <div className="title">Text:{thisPost.text}</div>
            
        </div>
    
    )
}


