import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
    function handleUser(user) {
        if (user.name) {
            return (
                <tr key={user.id}>
                    <td> {user.name} </td>
                    <td> {user.blogs.length} </td>
                </tr>
            )
        }
        return (
            <tr key={user.id}>
                <td> unnamed user </td>
                <td> {user.blogs.length} </td>
            </tr>
        )
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Nr. of blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(u => handleUser(u))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    const users = state.users
    return {
        users: users
    }
}

export default connect(
    mapStateToProps,
    null
)(Users)
