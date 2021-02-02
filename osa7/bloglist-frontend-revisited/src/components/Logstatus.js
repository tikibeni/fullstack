import React from 'react'
import { logoutUser } from "../reducers/userReducer";
import { createNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
import blogService from "../services/blogs";

const Logstatus = (props) => {
  const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      props.logoutUser()
      props.createNotification('Logged out successfully', 'success', 2)
  }

  return (
    <div>
      {props.user.name !== null
        ? <p>{props.user.name} logged in</p>
        : <p>{props.user.username} logged in</p>
      }
      <button type="submit" onClick={handleLogout}>logout</button>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    logoutUser,
    createNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logstatus)
