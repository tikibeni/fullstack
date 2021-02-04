import React from 'react'
import User from './User'
import { connect } from 'react-redux'

const Users = (props) => {
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
                    {props.users.map(u =>
                        <User key={u.id} user={u} />
                    )}
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
