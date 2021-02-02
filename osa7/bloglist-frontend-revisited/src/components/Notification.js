import React from 'react'
import './../App.css'
import {connect} from "react-redux";

const Notification = (props) => {
  return (
      <div>
        {props.notification !== null
          ?
          <div className={ props.notification.notiType }>
            { props.notification.content }
          </div>
          :
          <div>
          </div>
        }
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(
    mapStateToProps,
    null
)(Notification)
