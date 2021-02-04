import React, { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import UserProfile from './components/UserProfile'
import Logstatus from './components/Logstatus'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Users from './components/Users'
import blogService from './services/blogs'
import BlogForm from './components/forms/Blog'
import LoginForm from './components/forms/Login'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'
import './App.css'
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

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
    dispatch(initializeUsers())
  }, [dispatch])

  const handleBlogCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const match = useRouteMatch('/users/:id')
    const user = match
    ? props.users.find(u => u.id === match.params.id)
    : null

  return (
    <div>
      <Notification />
      <h1>Blog App</h1>
      <Switch>
        {props.user === null ?
          <LoginForm />
          :
          <div>
            <Logstatus />
            <Route path="/users/:id">
              <UserProfile user={user} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs">
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm appCreateBlog={handleBlogCreate} />
              </Togglable>
              <Blogs />
            </Route>
          </div>
        }
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

export default connect(
    mapStateToProps,
    null
)(App)
