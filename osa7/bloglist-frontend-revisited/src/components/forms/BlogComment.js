import React from "react";
import { connect } from 'react-redux'
import { commentBlog } from "../../reducers/blogReducer";
import { createNotification } from "../../reducers/notificationReducer";

const BlogComment = (props) => {
    const handleComment = (event) => {
        event.preventDefault()
        const newComment = {
            blogId: props.blogId,
            content: event.target.comment.value,
        }
        event.target.comment.value = ''
        props.commentBlog(newComment)
        props.createNotification('Added comment successfully', 'success', 2)
    }

    return (
        <div>
            <form id="commentForm" onSubmit={handleComment}>
                <input name="comment"/>
                <button id="comment-button" type="submit">add comment</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    commentBlog,
    createNotification
}

export default connect(
    null,
    mapDispatchToProps
)(BlogComment)
