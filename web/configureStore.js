import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

export default function configureStore() {
  const store = createStore(
    reducers,
    applyMiddleware(thunk, promiseMiddleware())
  )
  return store
}
