const filterReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.filter
        case 'RESET_FILTER':
            return action.filter
        default:
            return state
    }
}

export const createFilter = (content) => {
    return {
        type: 'SET_FILTER',
        filter: content
    }
}

export const resetFilter = () => {
    return {
        type: 'RESET_FILTER',
        filter: null
    }
}

export default filterReducer