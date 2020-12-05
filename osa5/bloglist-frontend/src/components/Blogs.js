import React, { useState } from 'react'

// Blogilistan käsittelystä vastaava osa
const Blogs = ({ blogs, currentUser, updateBlog, deleteBlog }) => {

  // Järjestää blogilistan tykkäysten mukaan
  // blogs.sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))

  // Järjestää blogilistan tykkäysten mukaan:
  // -HUOM FIKSAA TÄMÄ JOS EI LAITA JÄRKKÄÄN.!
  blogs = [].slice.call(blogs).sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedUser={currentUser} handleLike={updateBlog} handleRemove={deleteBlog} />
      )}
    </div>
  )
}

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

  const incrementLike = () => {
    blog.likes += 1
    handleLike(blog)
  }

  const blogRemoval = (event) => {
    event.preventDefault()
    handleRemove(blog)
  }

  return (
    <div>
      <div style={hideWhenVisible} className='blogRender'>
        {blog.title} by {blog.author} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes}<button id="like-button" onClick={incrementLike}>like</button></p>
        <p>
          {blog.user.name !== undefined
            ? blog.user.name
            : blog.user.username
          }
        </p>
        <p>
          {blog.user.id === loggedUser.id ? <button id ="remove-button" onClick={blogRemoval}>remove</button> : <br></br>}
        </p>
      </div>
    </div>
  )
}

export default Blogs