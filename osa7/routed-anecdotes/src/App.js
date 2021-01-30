import React, { useState } from 'react'

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import About from "./components/About";
import Anecdote from "./components/Anecdote";
import Anecdotes from "./components/Anecdotes";
import Notification from "./components/Notification";
import AnecdoteForm from "./util/AnecdoteForm";

import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

const App = () => {
    const [notification, setNotification] = useState('')
    const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

    /*
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
   */

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const match = useRouteMatch('/anecdotes/:id')
    const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  return (
    <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification}/>
        <Switch>
            <Route path="/anecdotes/:id">
                <Anecdote anecdote={anecdote} />
            </Route>
            <Route path="/create">
                <AnecdoteForm addNew={addNew} setNotification={setNotification} />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/">
                <Anecdotes anecdotes={anecdotes} />
            </Route>
        </Switch>
        <br />
        <Footer />
    </div>
  )
}

export default App;
