import { useEffect, useState } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";

export default function PostEdit (){
    const [posts,setPosts] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    console.log(thisPost)
    const[title,setTitle] = useState(thisPost.title)
    const[text,setText] = useState(thisPost.text)
    const[published,setPublished] = useState(thisPost.published)

    const navigate = useNavigate()
    function handleCancel(){
        navigate('../postpage/'+id);
    }
    async function handleSubmit(e){
        e.preventDefault();
        //post to databas
        //include method type

        const response = await fetch("https://blog-api-backend-59l7.onrender.com/posts/"+id,{
              method: "PUT",
              mode:"cors",
              body: JSON.stringify({title,text,published})
        })
        console.log(response)
 

//making a post
// const request = new Request("/api/posts", {
//   method: "POST",
//   body: JSON.stringify({ username: "example" }),
// });

// const response1 = await fetch(request);
// console.log(response1.status);
  //fetch users

        // navigate to postpage
        //navigate('../postpage/'+id);
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
            <h2>Edit Post</h2>
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
                <button type="button"onClick={handleCancel}>Cancel Edit</button>
            </form>

        </div>

    
    )
}

