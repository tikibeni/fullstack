import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    setTitle('')
    setAuthor('')
    setUrl('')
    setSuccessMessage('Logged out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }

  // Käsittelee blogin luontiprosessin
  const handleBlogCreate = async (event) => {
    event.preventDefault()
    try {
      const userId = user.id
      console.log('HANDLING BLOG CREATION: ', user)
      const blog = await blogService.create({
        title, author, userId, url,
      })

      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogs(blogs.concat(blog))

      setSuccessMessage(`Blog '${blog.title}' by ${blog.author} created`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Something went wrong during blog creation - check console')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // HUOM
  // REFAKTOROI TÄSTÄ ALASPÄIN OLEVAT FIKSUMMIKSI
  // HUOM

  // Lomake kirjautumista varten
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // Lomake blogin luontia varten
  const blogForm = () => (
    <form onSubmit={handleBlogCreate}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <Notification message={errorMessage} notificationType='error' />
      <Notification message={successMessage} notificationType='success' />

      {user === null ?
        <div>
          <h1>Log in to application</h1>
          {loginForm()}
        </div>

        :

        <div>
          <h1>Blogs</h1>
          <p>{user.username} logged in</p> 
          <button type="submit" onClick={handleLogout}>logout</button>

          <h2>Create blog</h2>
          {blogForm()}

          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App