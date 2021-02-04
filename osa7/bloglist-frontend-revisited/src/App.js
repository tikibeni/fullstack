import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import UserProfile from './components/UserProfile'
import BlogProfile from './components/BlogProfile'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Menu from './components/Menu'
import blogService from './services/blogs'
import BlogForm from './components/forms/Blog'
import LoginForm from './components/forms/Login'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

const App = (props) => {
  const dispatch = useDispatch()

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

  const matchUser = useRouteMatch('/users/:id')
    const user = matchUser
    ? props.users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
    const blog = matchBlog
    ? props.blogs.find(b => b.id === matchBlog.params.id)
    : null

  return (
    <div>
      <Notification />
        {props.user === null
          ? <LoginForm />
          :
          <div>
            <Menu />
            <Switch>
              <Route path="/users/:id">
                <UserProfile user={user} />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/blogs/:id">
                <BlogProfile blog={blog} />
              </Route>
              <Route path="/blogs">
                <BlogForm />
                <Blogs />
              </Route>
            </Switch>
          </div>
        }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs,
  }
}

export default connect(
    mapStateToProps,
    null
)(App)
