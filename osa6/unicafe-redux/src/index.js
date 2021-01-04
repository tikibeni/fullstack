import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const handleOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const handleBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const handleZero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text='good' /> 
      <Button onClick={handleOk} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Button onClick={handleZero} text='reset' />

      <h2>Stats</h2>
      <Stats good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Stats = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const avg = (good-bad) / sum
  const pos = good / sum * 100 + '%'

  if (sum === 0) {
    return (
      <div>
        No data.
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatsLine text='Good' value={good} />
        <StatsLine text='Neutral' value={neutral} />
        <StatsLine text='Bad' value={bad} />
        <StatsLine text='All' value={sum} />
        <StatsLine text='Average' value={avg} />
        <StatsLine text='Positive' value={pos} />
      </tbody>
    </table>
  )  
}

const StatsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
