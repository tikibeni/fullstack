import React, { useState } from 'react'

// Blogilistan käsittelystä vastaava osa
const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <h2>Blogs</h2>
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
          )}
    </div>
  )
}

// Yksittäisen blogin renderöinnistä vastaava osa
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
          <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>{blog.likes}<button>like</button></p>
          <p>
            {blog.user.name !== undefined
                ? blog.user.name
                : blog.user.username
            }
        </p>
      </div>
    </div>
  )
}

export default Blogs