import React, { useState, useEffect, useRef } from 'react'

import Blogs from './components/Blogs'
import Togglable from "./components/Togglable"
import Logstatus from './components/Logstatus'
import Notification from './components/Notification'

import BlogForm from "./components/forms/Blog"
import LoginForm from "./components/forms/Login"

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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

      setSuccessMessage(`Welcome ${user.username}!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Käsittelee uloskirjautumisen
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
    setSuccessMessage('Logged out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }

  // Käsittelee blogin luontiprosessin userId:n liittämisen kautta hyödyntäen refiä. Kts. ./components/forms/Blog.js
  const handleBlogCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.userId = user.id

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setSuccessMessage(`Blog '${returnedBlog.title}' by ${returnedBlog.author} created`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('Something went wrong during blog creation - check console')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // Käsittelee blogiin liittyvät muutokset ja toimittaa backendille
  const handleBlogUpdate = (blogObject) => {
    console.log('Frontin blogObject ennen axios: ', blogObject)

    blogService
      .update(blogObject)
      .then(returnedBlog => {
         
        console.log('Palautettu blogi axiosin jälkeen: ',returnedBlog)

        setBlogs(blogs.map(b => b.title !== blogObject.title ? b : returnedBlog))
        setSuccessMessage(
          `Updated blog '${blogObject.title}' likes to ${returnedBlog.likes}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        },2000)
      })
      .catch(error => {
        setErrorMessage('Something went wrong during blog updating')
        setTimeout(() => {
          setErrorMessage(null)
        },3000)
      })
  }

  return (
    <div>
      <Notification message={errorMessage} notificationType='error' />
      <Notification message={successMessage} notificationType='success' />

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
          <Blogs blogs={blogs} updateBlog={handleBlogUpdate} />
        </div>
      }

    </div>
  )
}

export default App