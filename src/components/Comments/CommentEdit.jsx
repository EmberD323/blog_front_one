import { useState } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "../Errors"


export default function CommentEdit (){
    const [posts,setPosts,token,setToken,edit,setEdit] = useOutletContext();
    const { postid,commentid } = useParams();
    const thisPost = (posts.filter((post) => post.id == postid))[0];
    const thisComment = (thisPost.comments.filter((comment) => comment.id == commentid))[0];
    const[text,setText] = useState(thisComment.text);
    const[formErrors,setFormErrors] = useState(null);
    const navigate = useNavigate()
    function handleCancel(){
        navigate('../postpage/'+postid);
    }
    async function handleSubmit(e){
        e.preventDefault();
        //post to database/:postid/comments/:commentid
        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+postid+"/comments/"+commentid, {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({text}),
        }); 
        console.log(response)
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
        }
        else{//reload posts and leave edit page
         
            setEdit(!edit);
            navigate('../postpage/'+postid);
        }

    }
    function handleTextChange(e){
        setText(e.target.value)
    }
    return (
        <div className="content">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Text</label>
                <textarea name="text" id="text" value={text} onChange={handleTextChange}/>
                <button type="submit" >Submit</button>
                <button type="button"onClick={handleCancel}>Cancel Edit</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


