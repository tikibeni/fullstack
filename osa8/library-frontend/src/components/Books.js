import React, { useEffect, useState } from 'react'
import BookTable from "./BookTable";

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [filterGenre, setFilterGenre] = useState(null)

  useEffect(() => {
    const genreCollection = []
    props.books.map(book => (
      book.genres.forEach(genre => {
        if (!genreCollection.includes(genre)) genreCollection.push(genre)
      })
    ))
    setGenres(genreCollection)
  }, [props.books])

  if (!props.show) {
    return null
  }

  const recommendDescription = () => {
    return `in your favorite genre ${props.userData.me.favoriteGenre}`
  }
  
  const genreDescription = () => {
    if (filterGenre !== null) {
      return `in genre ${filterGenre}`
    }

    return null
  }

  return (
    <div>
      {props.recommend
        ? <BookTable
            title="Recommended"
            description={recommendDescription()}
            books={props.books}
            genres={genres}
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            favoriteGenre={props.userData.me.favoriteGenre}
            recommendView={true}
          />
        : <BookTable
            title="Books"
            description={genreDescription()}
            books={props.books}
            genres={genres}
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            recommendView={false}
          />
      }
    </div>
  )
}

export default Books
