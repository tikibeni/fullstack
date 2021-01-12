import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const text = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(text))
        dispatch(createNotification(`created anecdote '${text}'`, 5))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm