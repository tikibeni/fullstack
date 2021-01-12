import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(ad => ad.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  const updatedAnecdote = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }

  const id = anecdote.id

  return async dispatch => {
    await anecdoteService.update(id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer