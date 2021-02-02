import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

// Yksittäisen blogin renderöinnistä vastaava osa
const Blog = ({ blog, loggedUser, handleLike, handleRemove }) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = {
        display: visible ? 'none' : '',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showWhenVisible = {
        display: visible ? '' : 'none',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible} className='blogRender'>
                {blog.title} by {blog.author} <button onClick={toggleVisibility}>show</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>hide</button></p>
                <p>{blog.url}</p>
                <p>{blog.likes}<button id="like-button" onClick={() => handleLike(blog)}>like</button></p>
                <p>
                    {blog.user.name !== undefined
                        ? blog.user.name
                        : blog.user.username
                    }
                </p>
                <p>
                    {blog.user.id === loggedUser.id ? <button id ="remove-button" onClick={() => handleRemove(blog)}>remove</button> : <br></br>}
                </p>
            </div>
        </div>
    )
}

const Blogs = (props) => {
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
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id}
              blog={blog}
              loggedUser={props.user}
              handleLike={handleLike}
              handleRemove={handleRemove}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
    const organizedBlogs = [].slice.call(state.blogs).sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
    const user = state.user
    return {
        blogs: organizedBlogs,
        user: user,
    }
}

const mapDispatchToProps = {
    likeBlog,
    deleteBlog,
    createNotification
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs
