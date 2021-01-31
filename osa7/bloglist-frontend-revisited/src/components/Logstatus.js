import React from 'react'

const Logstatus = ({ user, handleStatusChange }) => {
  return (
    <div>
      {user.name !== undefined
        ? <p>{user.name} logged in</p>
        : <p>{user.username} logged in</p>
      }
      <button type="submit" onClick={handleStatusChange}>logout</button>
    </div>
  )
}

export default Logstatus