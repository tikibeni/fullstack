import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification } from "../reducers/notificationReducer";

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

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(createNotification('Voted anecdote: ' + anecdote.content))
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
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList