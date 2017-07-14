import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {posts, counter} from './reducers'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore({initialState, client} = {}) {
  const store = createStore(
    combineReducers({
      posts,
      counter,
      apollo: client.reducer(),
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(client.middleware(), thunk, promiseMiddleware())
    ),
  )
  return store
}
