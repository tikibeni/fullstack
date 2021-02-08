import React from "react";
import { connect } from "react-redux";
import BlogComment from './forms/BlogComment'
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

const BlogProfile = (props) => {
    if (!props.blog) {
        return null
    }

    const handleLike = (blog) => {
        props.likeBlog(blog)
        props.createNotification(`Updated blog '${blog.title}' likes to ${blog.likes + 1}`, 'success', 2)
    }

    const handleRemove = (blog) => {
        if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            props.deleteBlog(blog)
            props.createNotification(`Deleted '${blog.title}' by '${blog.author}'`, 'success', 5)
        }
    }
    
    return (
        <div>
            <h1>{props.blog.title} by {props.blog.author}</h1>
            <p>{props.blog.url}</p>
            <p>{props.blog.likes}<button id="like-button" onClick={() => handleLike(props.blog)}>like</button></p>
            <p>
                {props.blog.user.name !== undefined
                    ? props.blog.user.name
                    : props.blog.user.username
                }
            </p>
            <h3>Comments:</h3>
            <BlogComment blogId={props.blog.id}/>
            <div>
                {props.blog.comments.length !== 0
                    ? <ul>
                        {props.blog.comments.map((comment, index) => (
                            <li key={index}> {comment} </li>
                        ))}
                      </ul>
                    : <div>No comments yet!</div>
                }
            </div>
            <p>
                {props.blog.user.id === props.user.id ? <button id ="remove-button" onClick={() => handleRemove(props.blog)}>remove</button> : <br></br>}
            </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    likeBlog,
    deleteBlog,
    createNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogProfile)
