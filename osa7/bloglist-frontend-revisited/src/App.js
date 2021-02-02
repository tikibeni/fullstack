import React, {useEffect, useRef} from 'react'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Logstatus from './components/Logstatus'
import Notification from './components/Notification'
import BlogForm from './components/forms/Blog'
import LoginForm from './components/forms/Login'
import blogService from './services/blogs'
import {connect, useDispatch} from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { loginUser } from "./reducers/userReducer";
import './App.css'

const App = (props) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleBlogCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  return (
    <div>
      <Notification />
      {props.user === null ?
        <div>
          <LoginForm />
        </div>
        :
        <div>
          <Logstatus />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm appCreateBlog={handleBlogCreate} />
          </Togglable>
          <Blogs />
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
    mapStateToProps,
    null
)(App)
