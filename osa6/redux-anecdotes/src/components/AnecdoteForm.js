import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const text = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(text)
        props.createNotification(`created anecdote '${text}'`, 5)
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    createNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)