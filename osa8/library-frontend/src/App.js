import React, {useEffect, useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR, LOGIN, ME} from "./gqlqueries";

const App = () => {
  const [showRecommend, setShowRecommend] = useState(false)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const fetchedAuthors = useQuery(ALL_AUTHORS)
  const fetchedBooks = useQuery(ALL_BOOKS)
  const fetchedUser = useQuery(ME)
  const client = useApolloClient()

  const [ createBook ] = useMutation(CREATE_BOOK, {
      onError: (error) => {
          console.log('error: ', error)
      },
      update: (store, response) => {
        const dataInStore = store.readQuery({ query: ALL_BOOKS })
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...dataInStore,
            allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
          }
        })
      }
  })

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ],
    onError: (error) => {
      console.log('error: ', error)
    },
  })

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ME } ],
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

  if (fetchedAuthors.loading || fetchedBooks.loading) {
      return <div>loading...</div>
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    setPage('authors')
    client.resetStore()
  }

  const handleRecommend = () => {
    setShowRecommend(true)
    setPage('books')
  }

  const handleBooksView = () => {
    setShowRecommend(false)
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => handleBooksView()}>books</button>
        {token === null
          ? <button onClick={() => setPage('login')}>login</button>
          : <div>
              <button onClick={() => handleRecommend()}>recommend</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => handleLogout()}>logout</button>
            </div>
        }
      </div>

      <LoginForm
        show={page === 'login' && token === null}
        setPage={setPage}
        login={login}
      />

      <Authors
        show={page === 'authors'}
        authors={fetchedAuthors.data.allAuthors}
        authorEdit={editAuthor}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={fetchedBooks.data.allBooks}
        recommend={showRecommend}
        userData={fetchedUser.data}
      />

      <NewBook
        show={page === 'add'}
        createHandler={createBook}
      />
    </div>
  )
}

export default App
