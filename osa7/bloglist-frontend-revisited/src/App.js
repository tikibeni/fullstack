import React, { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Logstatus from './components/Logstatus'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'

import BlogForm from './components/forms/Blog'
import LoginForm from './components/forms/Login'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  // Hakee suoraan kaikki blogit kannasta
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
  const handleBlogCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.userId = user.id

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(createNotification(`Blog '${returnedBlog.title}' by ${returnedBlog.author} created`, 'success', 5))
      })
      .catch(error => {
        dispatch(createNotification('Something went wrong during blog creation - check console', 'error', 5))
        console.log(error.message)
      })
  }

  // Käsittelee blogiin liittyvät muutokset ja toimittaa backendille
  const handleBlogUpdate = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.title !== blogObject.title ? b : returnedBlog))
        dispatch(createNotification(`Updated blog '${blogObject.title}' likes to ${returnedBlog.likes}`, 'success', 2))
      })
      .catch(error => {
        dispatch(createNotification('Something went wrong during blog updating', 'error', 3))
        console.log(error.message)
      })
  }

  const handleBlogDelete = (blogObject) => {

    if (window.confirm(`Delete ${blogObject.title} by ${blogObject.author}?`)) {
      blogService
        .remove(blogObject.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
          dispatch(createNotification(`Deleted '${blogObject.title}' by '${blogObject.author}'`, 'success', 5))
        })
        .catch(error => {
          dispatch(createNotification('Something went wrong during deletion', 'error', 5))
          console.log(error.message)
        })
    }
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
            <BlogForm createBlog={handleBlogCreate} />
          </Togglable>
          <Blogs blogs={blogs} currentUser={user} updateBlog={handleBlogUpdate} deleteBlog={handleBlogDelete} />
        </div>
      }
    </div>
  )
}

export default App
