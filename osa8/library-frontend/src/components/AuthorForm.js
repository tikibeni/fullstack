import React, { useState } from "react";

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = async (event) => {
    event.preventDefault()

    props.handler({ variables: { name, born } })

    setBorn('')
  }

  return (
    <form onSubmit={submit}>
      <h3>Set birthyear</h3>
      <div>
        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {props.authors.map(author => (
            <option key={author.id} value={author.name}>{author.name}</option>
          ))}
        </select>
      </div>
      <div>
        born
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
      </div>
      <button type='submit'>update author</button>
    </form>
  )
}

export default AuthorForm;
