import CommentCard from "./CommentCard.jsx";

export default function CommentCards ({comments, post}){
    return (
        <div className="commentCards">
            <ul >
                {comments.map((comment) => {
                    return <CommentCard comment={comment} post={post}/>
                })}
            </ul>
        </div>
    
    )
}


