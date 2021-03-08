import React, { useState } from "react";

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = async (event) => {
    event.preventDefault()

    props.handler({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <form onSubmit={submit}>
      <h3>Set birthyear</h3>
      <div>
        name
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
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
