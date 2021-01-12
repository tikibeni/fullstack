import React from 'react'
import Notification from "./components/Notification"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App