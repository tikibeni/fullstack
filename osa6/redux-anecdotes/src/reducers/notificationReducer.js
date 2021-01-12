const notificationReducer = (state = null, action) => {
    console.log('ACTIONI KOKONAISUUDESSAAN:', action)
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

export const createNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        notification: content
    }
}

export default notificationReducer