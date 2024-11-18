import { useOutletContext,useParams,useNavigate } from "react-router-dom";
import CommentCards from "../Comments/CommentCards";
import NewComment from '../Comments/NewComment.jsx';
import Login from '../Users/Login.jsx';
import Publish from '../Partials/Publish.jsx'

export default function PostPage (){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const { id } = useParams();
    const thisPost = (posts.filter((post) => post.id == id))[0];
    const dateTime = new Date((Date.parse(thisPost.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    const thisAuthor = users.filter((user)=>user.id == thisPost.userId)[0];
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
            <Login></Login>
        )
    }
    return (
        <div className="postpage">
            <div className="post">
                <div className="header">
                    <h2 className="title">{thisPost.title}</h2>
                    <div className="buttons">
                    <button onClick={handlePostEdit}><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/0a2463/edit--v1.png" alt="edit--v1"/></button>
                        <button onClick={handlePostDelete}><img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/0a2463/filled-trash.png" alt="filled-trash"/></button>
                        <button onClick={handlePostPublish}>Publish</button>
                        <Publish post={thisPost} handlePostPublish={handlePostPublish}></Publish>
                    </div>
                </div>
                <div className="imgPlaceholder">Image Placeholder (300 x 300)</div>
                <div className="author">Author: {thisAuthor.first_name} {thisAuthor.last_name}</div>
                <div className="date">Created: {dayMonthYear} @ {time}</div>
                <div className="text">{thisPost.text}</div>
            </div>
            <div className="comments">
                <h2 className="title">Comments ({thisPost.comments.length}):</h2>
                <NewComment/>
                <CommentCards comments={thisPost.comments} post={thisPost}></CommentCards>
            </div>
        </div>
    )
}


