import React, {useEffect, useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import {useApolloClient, useLazyQuery, useMutation, useQuery, useSubscription} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, CREATE_BOOK, EDIT_AUTHOR, LOGIN, ME} from "./gqlqueries";

const App = () => {
  const [showRecommend, setShowRecommend] = useState(false)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const fetchedAuthors = useQuery(ALL_AUTHORS)
  const [fetchedBooks, setFetchedBooks] = useState([])
  const [fetchBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
  const [filterGenre, setFilterGenre] = useState(null)
  const fetchedUser = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
    }
  })

  useEffect(() => {
    if (!loading && data !== undefined) {
      console.log('AllBooks: ', data.allBooks)
      setFetchedBooks(data.allBooks)
    }
  }, [data, loading])

  const [ createBook ] = useMutation(CREATE_BOOK, {
      refetchQueries: [ { query: ALL_BOOKS } ],
      onError: (error) => {
          console.log('error: ', error)
      },
      // Read- ja writequery eivät toimineet palauttaessaan nullia.
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

  if (fetchedAuthors.loading || loading) {
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
    fetchBooks({ variables: { genre: fetchedUser.data.me.favoriteGenre} })
    setPage('books')
  }

  const handleBooksView = () => {
    setShowRecommend(false)
    fetchBooks({ variables: { genre: null } })
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
        books={fetchedBooks}
        changeGenre={fetchBooks}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
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
