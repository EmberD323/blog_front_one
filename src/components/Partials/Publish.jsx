export default function PostCard ({post, handlePostPublish}){
    if(post.published == true){
        return
    }
    return (
        <button onClick={handlePostPublish}>Publish</button>
    )
}


