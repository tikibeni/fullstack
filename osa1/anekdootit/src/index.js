import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const AnecdoteDisplay = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick = {onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteAmount, setVotes] = useState(0)
  const [mostVoted, setMaximum] = useState(0)

  const handleRandom = () => setSelected(Math.floor(Math.random() * 6))


  const handleVote = () => {
    props.anecdotes[selected].votes += 1
    setVotes(props.anecdotes[selected].votes)
    if (props.anecdotes[selected].votes >= props.anecdotes[mostVoted].votes) {
      setMaximum(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteDisplay text={props.anecdotes[selected].text} votes={props.anecdotes[selected].votes} />
      
      <p>
        <Button onClick={handleRandom} text="Next anecdote" />
        <Button onClick={handleVote} text="Vote" />
      </p>

      <h1>Anecdote with most votes</h1>
      <AnecdoteDisplay text={props.anecdotes[mostVoted].text} votes={props.anecdotes[mostVoted].votes} />
    </div>
  )
}

const anecdotes = [
  {text: 'If it hurts, do it more often', votes: 0},
  {text: 'Adding manpower to a late software project makes it later!', votes: 0},
  {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
  {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
  {text: 'Premature optimization is the root of all evil.', votes: 0},
  {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0}
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)