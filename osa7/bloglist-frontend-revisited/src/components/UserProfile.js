import React from "react";

const UserProfile = (props) => {
    if (!props.user) {
        return null
    }
    return (
        <div>
            {props.user.name
            ? <h1>{props.user.name}</h1>
            : <h1>unnamed</h1>
            }
            <h2>Added blogs</h2>
            <ul>
                {props.user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserProfile
