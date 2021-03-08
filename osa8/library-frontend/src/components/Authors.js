import React from 'react'
import AuthorForm from "./AuthorForm";

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors
            ? props.authors.map(a =>
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              )
            : null
          }
        </tbody>
      </table>

      <AuthorForm handler={props.authorEdit} />

    </div>
  )
}

export default Authors
