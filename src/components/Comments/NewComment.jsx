import { useState } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "../Errors"


export default function NewComment (){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    const[text,setText] = useState(null);
    const[formErrors,setFormErrors] = useState(null);
    const navigate = useNavigate()
    function handleCancel(){
        navigate('../postpage/'+postid);
    }
    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+id+"/comments/", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({text}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
        }
        else{//reload posts and leave edit page
            setText("");
            setEdit(!edit);
            
            //clear form
            navigate('../postpage/'+id);
        }

    }
    function handleTextChange(e){
        setText(e.target.value)
    }
    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Text</label>
                <textarea name="text" id="text" value={text} onChange={handleTextChange}/>
                <button type="submit" >Submit</button>
                <button type="button"onClick={handleCancel}>Cancel</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


