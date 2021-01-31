import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notificationReducer"

const Store = createStore(notificationReducer, composeWithDevTools(applyMiddleware(thunk)))
export default Store
