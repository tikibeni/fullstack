import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification } from "../reducers/notificationReducer";

// Yksittäisanekdootin renderöinti
const Anecdote = ({anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

// Anekdoottilistan hallinta
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === null) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anec => (anec.content.trim().toLowerCase().includes(state.filter.trim().toLowerCase())))
    })

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        handleNotification(anecdote.content)
    }

    const handleNotification = (content) => {
        dispatch(createNotification('Voted anecdote: ' + content))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                        handleVote(anecdote)
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList