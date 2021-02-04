import React from "react";
import {Link, useHistory} from "react-router-dom";
import {logoutUser} from "../reducers/loginReducer";
import {createNotification} from "../reducers/notificationReducer";
import {connect} from "react-redux";
import blogService from "../services/blogs";
import './../App.css'

const Menu = (props) => {
    const history = useHistory()

    const padding = {
        paddingRight: 5,
        paddingLeft: 5
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        blogService.setToken(null)
        props.logoutUser()
        props.createNotification('Logged out successfully', 'success', 2)
        history.push('/')
    }

    return (
        <div>
            <p className={ "menu" }>
                <Link style={padding} to="/blogs">blogs</Link>
                <Link style={padding} to="/users">users</Link>

                {props.user.name
                    ? <>{props.user.name} logged in</>
                    : <>{props.user.username} logged in</>
                }
                <button style={padding} type="submit" onClick={handleLogout}>logout</button>
            </p>
            <h1>Blog App</h1>
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
)(Menu)
