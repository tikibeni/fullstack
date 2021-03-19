import React, {useEffect, useState} from 'react'

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState(null)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const test = []
    props.books.map(book => (
      book.genres.map(genre => {
        if (!test.includes(genre)) test.push(genre)
      })
    ))
    setGenres(test)
  }, [props.books])

  if (!props.show) {
    return null
  }

  const checkGenre = (book) => {
    if (book.genres.includes(filterGenre) || filterGenre === null) {
      return (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      )
    }
  }

  return (
    <div>
      <h2>books</h2>

      {filterGenre !== null
        ? <div>
            in genre <b>{filterGenre}</b>
          </div>
        : null
      }
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {props.books
          ? props.books.map(a =>
              checkGenre(a)
            )
           : null
        }
        </tbody>
      </table>

      <div>
        {genres.length !== 0
          ? genres.map(genre => (
              <button key={genre} onClick={() => setFilterGenre(genre)}>{genre}</button>
            ))
          : null
        }
        <button onClick={() => setFilterGenre(null)}>all genres</button>
      </div>

    </div>
  )
};

export default Books
