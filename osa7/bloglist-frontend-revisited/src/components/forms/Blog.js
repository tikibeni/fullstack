import React from 'react'
import { connect } from 'react-redux'
import { createNotification } from "../../reducers/notificationReducer";

const BlogForm = (props) => {
  const addBlog = (event) => {
    event.preventDefault()
    props.appCreateBlog({
      title: event.target.title.value,
      userId: props.user.id,
      author: event.target.author.value,
      url: event.target.url.value,
    })
    props.createNotification(`Blog '${event.target.title.value}' by ${event.target.author.value} created`, 'success', 5)
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
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
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)
