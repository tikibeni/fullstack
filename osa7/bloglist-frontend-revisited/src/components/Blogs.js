import React from 'react'
import Blog from "./Blog";
import { connect } from 'react-redux'

const Blogs = (props) => {
  return (
    <div>

      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
    const organizedBlogs = [].slice.call(state.blogs).sort((a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))
    return {
        blogs: organizedBlogs,
    }
}

export default connect(
    mapStateToProps,
    null
)(Blogs)
