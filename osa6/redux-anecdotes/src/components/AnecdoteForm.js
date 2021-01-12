import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const text = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(text))
        handleNotification(text)
    }

    const handleNotification = (content) => {
        dispatch(createNotification('created anecdote: ' + content))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm