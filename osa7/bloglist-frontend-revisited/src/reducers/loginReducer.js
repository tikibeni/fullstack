const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return action.user
        case 'USER_LOGOUT':
            return action.user
        default:
            return state
    }
}

export const loginUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'USER_LOGIN',
            user: user
        })
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: 'USER_LOGOUT',
            user: null
        })
    }
}

export default loginReducer
