import React, { useEffect, useState } from 'react'
import BookTable from "./BookTable";

const Books = (props) => {
  const [genres, setGenres] = useState([])

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
    if (props.filterGenre !== null) {
      return `in genre ${props.filterGenre}`
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
            changeGenre={props.changeGenre}
            setFilterGenre={props.setFilterGenre}
            favoriteGenre={props.userData.me.favoriteGenre}
            recommendView={true}
          />
        : <BookTable
            title="Books"
            description={genreDescription()}
            books={props.books}
            genres={genres}
            changeGenre={props.changeGenre}
            setFilterGenre={props.setFilterGenre}
            recommendView={false}
          />
      }
    </div>
  )
}

export default Books
