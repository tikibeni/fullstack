import React from 'react'
import { useSelector } from 'react-redux'
import './../App.css'

const Notification = () => {
  // Change this if multiple state variables via combined reducers
  const notification = useSelector(state => state)

  return (
      <div>
        {notification !== null
          ?
          <div className={ notification.notiType }>
            { notification.content }
          </div>
          :
          <div>
          </div>
        }
      </div>
  )
}

export default Notification
