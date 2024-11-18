import PostCard from "./PostCard.jsx";

export default function PostCards ({posts}){
    return (
        <div className="postCards">
            <ul>
                {posts.map((post) => {
                    return <PostCard post={post}/>
                })}
            </ul>
        </div>
    )
}


