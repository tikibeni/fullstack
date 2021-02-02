import React from 'react'
import userService from "../../services/login";
import blogService from "../../services/blogs";
import { connect } from "react-redux";
import { loginUser } from "../../reducers/userReducer";
import { createNotification } from "../../reducers/notificationReducer";

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    const credentials = { username, password }

    try {
      const user = await userService.login(credentials)
      props.loginUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.createNotification(`Welcome ${user.username}!`, 'success', 2)

    } catch (error) {
      props.createNotification('Wrong username or password', 'error', 5)
    }

  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form id="loginForm" onSubmit={handleLogin}>
        <div className="username">
          username
          <input name="username"/>
        </div>
        <div className="password">
          password
          <input name="password"/>
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  loginUser,
  createNotification
}

export default connect(
    null,
    mapDispatchToProps
)(LoginForm)
