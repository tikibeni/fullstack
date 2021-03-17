import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR } from "./gqlqueries";

const App = () => {
  const [page, setPage] = useState('authors')
  const fetchedAuthors = useQuery(ALL_AUTHORS)
  const fetchedBooks = useQuery(ALL_BOOKS)
  const [ createBook ] = useMutation(CREATE_BOOK, {
      refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
      onError: (error) => {
          console.log('error: ', error)
      }
  })

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ],
    onError: (error) => {
      console.log('error: ', error)
    }
  })

  if (fetchedAuthors.loading || fetchedBooks.loading) {
      return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={fetchedAuthors.data.allAuthors}
        authorEdit={editAuthor}
      />

      <Books
        show={page === 'books'}
        books={fetchedBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        createHandler={createBook}
      />

    </div>
  )
}

export default App
