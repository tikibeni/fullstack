import React from 'react'

// Blogilistan käsittelystä vastaava osa
const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
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