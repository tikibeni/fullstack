const BookTable = (props) => {
  const checkRenderConditions = (book) => {
    // Purkkaviritelmä
    if (
      (book.genres.includes(props.filterGenre) && !props.recommendView)       // Filtteri
      || (props.filterGenre === null && !props.recommendView)                 // Kaikki
      || (props.recommendView && book.genres.includes(props.favoriteGenre) )  // Recommend-viewi.
    ) {
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
      <h2>{props.title}</h2>
      <div>
        {props.description}
      </div>
      <table>
        <tbody>
        <tr>
          <th />
          <th>author</th>
          <th>published</th>
        </tr>
        {props.books
          ? props.books.map(book =>
              checkRenderConditions(book)
            )
          : null
        }
        </tbody>
      </table>

      {!props.recommendView
        ? <div>
          {props.genres.map(genre => (
            <button key={genre} onClick={() => props.setFilterGenre(genre)}>{genre}</button>
          ))}
            <button onClick={() => props.setFilterGenre(null)}>all genres</button>
          </div>
        : null
      }
    </div>
  )
}

export default BookTable
