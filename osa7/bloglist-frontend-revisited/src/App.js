import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Logstatus from './components/Logstatus'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

import BlogForm from './components/forms/Blog'
import LoginForm from './components/forms/Login'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Hakee suoraan kaikki blogit kannasta
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Tarkistaa sivun avaamisen yhteydessä onko käyttäjä jo kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Käsittelee kirjautumisprosessin
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      dispatch(createNotification(`Welcome ${user.username}!`, 'success', 2))
    } catch (exception) {
      dispatch(createNotification('Wrong username or password', 'error', 5))
    }
  }

  // Käsittelee uloskirjautumisen
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
    dispatch(createNotification('Logged out successfully', 'success', 2))
  }

  // Käsittelee blogin luontiprosessin userId:n liittämisen kautta hyödyntäen refiä. Kts. ./components/forms/Blog.js
  // TODO: Refaktoroi tämä kokonaan Blog.js:ään, kun kaikki elementit laitettu storeen.
  const handleBlogCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.userId = user.id
    dispatch(createBlog(blogObject))
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
        :
        <div>
          <Logstatus user={user} handleStatusChange={handleLogout} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm appCreateBlog={handleBlogCreate} />
          </Togglable>
          <Blogs currentUser={user}/>
        </div>
      }
    </div>
  )
}

export default App
