import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer";

const _ = require('lodash')

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
        const organizedAnecdotes = _.orderBy(state.anecdotes, 'votes', 'desc')
        if (state.filter === null) {
            return organizedAnecdotes
        }
        return organizedAnecdotes.filter(anec => (anec.content.trim().toLowerCase().includes(state.filter.trim().toLowerCase())))
    })

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
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