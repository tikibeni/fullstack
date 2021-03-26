import React, { useState } from "react";

const LoginForm = ({ setPage, show, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async (event) => {
    event.preventDefault()
    login({variables: {username, password}}).then(r => {
      if (r !== undefined) {
        setPage('authors')
      }
      setUsername('')
      setPassword('')
    })
   }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submitLogin}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
