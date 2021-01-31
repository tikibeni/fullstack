import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createNotification } from "../../reducers/notificationReducer";

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    // Tämä kirjautumistietojen jälkeen kokonaan omaksi.
    props.appCreateBlog({
      title: title,
      userId: null,
      author: author,
      url: url,
    })
    props.createNotification(`Blog '${title}' by ${author} created`, 'success', 5)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form id="blogForm" onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  // createBlog,
  createNotification
}

export default connect(
    null,
    mapDispatchToProps
)(BlogForm)
