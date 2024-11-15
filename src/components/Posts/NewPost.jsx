import { useEffect, useState } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "../Errors"


export default function NewPost (){
    const [posts,setPosts,token,setToken,edit,setEdit] = useOutletContext();
    const[title,setTitle] = useState(null);
    const[text,setText] = useState(null);
    const[published,setPublished] = useState(null);
    const[formErrors,setFormErrors] = useState(null);

    const navigate = useNavigate()
    function handleCancel(){
        navigate('../homepage/');
    }
    async function handleSubmit(e){
        e.preventDefault();
        //post to database
        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/", {
            method: "POST",
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
            navigate('../homepage');
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
    return (
        <div className="content">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={title} onChange={handleTitleChange}/>
                <label htmlFor="text">Text</label>
                <textarea name="text" id="text" value={text} onChange={handleTextChange}/>
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
                <button type="submit" >Submit</button>
                <button type="button"onClick={handleCancel}>Cancel</button>
            </form>
            <Errors errors={formErrors}/>

        </div>
    )
}


