import React from 'react'

const Blogs = ({ blogs }) => {
  return (
    <ul>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  )
}

// Yksittäisen blogin renderöinnistä vastaava osa
const Blog = ({ blog }) => {
  return (
    <li className='blog'>
      {blog.title} {blog.author}
    </li>
  )
}

export default Blogs