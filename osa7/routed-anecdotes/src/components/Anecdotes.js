import { Link } from "react-router-dom";
import React from "react";

const Anecdotes = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote =>
                <li key={anecdote.id}>
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

export default Anecdotes
