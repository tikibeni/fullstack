import React from "react";
import { Link } from "react-router-dom";

const Blog = (props) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (!props.blog) {
        return null
    }
    return (
        <div style={blogStyle}>
            <Link to={`/blogs/${props.blog.id}`}> {props.blog.title} by {props.blog.author} </Link>
        </div>
    )
}

export default Blog
