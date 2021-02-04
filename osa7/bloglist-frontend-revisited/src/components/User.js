import React from "react";
import { Link } from 'react-router-dom'

const User = (props) => {
    if (props.user.name) {
        return (
            <tr>
                <td>
                    <Link to={`/users/${props.user.id}`}>{props.user.name} </Link>
                </td>
                <td> {props.user.blogs.length} </td>
            </tr>
        )
    }
    return (
        <tr>
            <td>
                <Link to={`/users/${props.user.id}`}>unnamedUser</Link>
            </td>
            <td> {props.user.blogs.length} </td>
        </tr>
    )
}

export default User
