import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostCard ({post}){
    const dateTime = new Date((Date.parse(post.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const value = crypto.randomUUID()
    return (
        <li key={value}>
            <Link to={`../otherpage/${post.id}`}>
                <div className="title">Title:{post.title}</div>
                <div className="author">Authorid(need name - todo):{post.userId}</div>
                <div className="date">Created: {dayMonthYear}</div>
                <div className="commentCount">Number of comments: {post.comments.length}</div>
                <div className="published">Published: {String(post.published)}</div>
            </Link>
        </li>
    
    )
}


