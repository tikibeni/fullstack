let timeoutID = null

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'DELETE_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const deleteNotification = () => {
    return {
        type: 'DELETE_NOTIFICATION',
        notification: null
    }
}

export const createNotification = (content, notiType, time) => {
    const notification = { content, notiType }

    return async dispatch => {
        if (timeoutID !== null) {
            clearTimeout(timeoutID)
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: notification,
        })
        timeoutID = setTimeout(() => {
            dispatch(deleteNotification())
            timeoutID = null
        }, time * 1000)
    }
}

export default notificationReducer
