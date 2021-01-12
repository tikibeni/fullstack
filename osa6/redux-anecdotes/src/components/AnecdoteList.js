import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer";
// Ylläolevat action creatorit eivät sisällä dispatchausta, vaan pelkkä funktio

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
const AnecdoteList = (props) => {
    const handleVote = (anecdote) => {
        props.voteAnecdote(anecdote)
        props.createNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    const organizedAnecdotes = _.orderBy(state.anecdotes, 'votes', 'desc')
    if (state.filter === null) {
        return {
            anecdotes: organizedAnecdotes
        }
    }
    return {
        anecdotes: organizedAnecdotes.filter(anecdote => (anecdote.content.trim().toLowerCase().includes(state.filter.trim().toLowerCase())))
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    createNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes