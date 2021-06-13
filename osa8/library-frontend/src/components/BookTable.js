const BookTable = (props) => {
  const filterHandler = (genre) => {
    props.changeGenre({ variables: { genre: genre } })
    props.setFilterGenre(genre)
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
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          : null
        }
        </tbody>
      </table>

      {!props.recommendView
        ? <div>
          {props.genres.map(genre => (
            <button
              key={genre}
              onClick={() => filterHandler(genre)}
            >
              {genre}
            </button>
          ))}
            <button onClick={() => filterHandler(null)}>
              all genres
            </button>
          </div>
        : null
      }
    </div>
  )
}

export default BookTable
