import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog } from "../../reducers/blogReducer";
import { createNotification } from "../../reducers/notificationReducer";

const BlogForm = (props) => {
  const history = useHistory()
  const [visible, setVisible] = useState(false)

  const showWhenVisible = {
    display: visible ? '' : 'none',
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 2,
    marginBottom: 5
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      userId: props.user.id,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    props.createBlog(newBlog)
    props.createNotification(`Blog '${event.target.title.value}' by ${event.target.author.value} created`, 'success', 5)
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    history.push('/blogs')
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <button onClick={toggleVisibility}>create new</button>
      <div style={showWhenVisible}>
        <h2>Create new blog</h2>
        <form id="blogForm" onSubmit={addBlog}>
          <div>
            title:
            <input name="title"/>
          </div>
          <div>
            author:
            <input name="author"/>
          </div>
          <div>
            url:
            <input name="url"/>
          </div>
          <button id="create-button" type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createNotification,
  createBlog
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)
