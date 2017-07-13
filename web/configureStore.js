import {createStore, applyMiddleware, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export default function configureStore({initialState} = {}) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, promiseMiddleware())
    ),
  )
  return store
}
