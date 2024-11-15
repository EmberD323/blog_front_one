import { useState } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "../Errors"
import Login from '../Users/Login.jsx';


export default function PostEdit (){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    const[title,setTitle] = useState(thisPost.title);
    const[text,setText] = useState(thisPost.text);
    const[published,setPublished] = useState(thisPost.published);
    const[formErrors,setFormErrors] = useState(null);


    const navigate = useNavigate()
    function handleCancel(){
        navigate('../postpage/'+id);
    }
    async function handleSubmit(e){
        e.preventDefault();
        //post to database
        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+id, {
            method: "PUT",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({title,text,publish:published}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
        }
        else{//reload posts and leave edit page
            setEdit(!edit);
            navigate('../postpage/'+id);
        }

    }
    function handleTitleChange(e){
        setTitle(e.target.value)
    }
    function handleTextChange(e){
        setText(e.target.value)
    }
    function handlePublishChange(e){
        setPublished(e.target.value)
    }
    if(typeof token == "object"){
        return (
            <Login></Login>
        )
    }
    return (
        <div className="createPost">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={handleTitleChange}/>
                </div>
                <div className="text">
                    <label htmlFor="text">Text</label>
                    <textarea name="text" id="text" value={text} onChange={handleTextChange}/>
                </div>
                <fieldset>
                    <legend>Publish on submit? </legend>
                    <div>
                        <input type="radio" id="true" name="published" value="true" onChange={handlePublishChange}/>
                        <label htmlFor="true">Yes</label>
                    </div>
                    <div>
                        <input type="radio" id="false" name="published" value="false" onChange={handlePublishChange}/>
                        <label htmlFor="false">No</label>
                    </div>
                </fieldset>
                <div className="buttons">
                    <button type="submit" >Submit</button>
                    <button type="button"onClick={handleCancel}>Cancel Edit</button>
                </div>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


