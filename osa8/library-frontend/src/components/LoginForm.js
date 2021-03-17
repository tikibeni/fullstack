import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from '../gqlqueries'

const LoginForm = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('Error: ', error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

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
