import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick,text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good,neutral,bad}) => {
  const sum = good + neutral + bad
  const avg = (good-bad) / sum
  const pos = good / sum * 100 + "%"

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
        <StatisticLine text="Good" value = {good} />
        <StatisticLine text="Neutral" value = {neutral} />
        <StatisticLine text="Bad" value = {bad} />
        <StatisticLine text="All" value = {sum} />
        <StatisticLine text="Average" value = {avg} />
        <StatisticLine text="Positive" value = {pos} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)