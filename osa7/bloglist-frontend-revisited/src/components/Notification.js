import React from 'react'
import { useSelector } from 'react-redux'
import './../App.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

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
