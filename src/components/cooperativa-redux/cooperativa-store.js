import { createStore, combineReducers } from 'redux'
import userReducer from './cooperativa-reducers/cooperativa-user-reducer'
import appReducer from './cooperativa-reducers/cooperativa-app-reducer'

let reducerCombination = combineReducers({
  userReducer,
  appReducer
})

export default createStore(reducerCombination, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
