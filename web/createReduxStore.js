import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {counter} from './reducers'

import {Actions as FarceActions, createHistoryEnhancer, queryMiddleware} from 'farce'
import createMatchEnhancer from 'found/lib/createMatchEnhancer'
import foundReducer from 'found/lib/foundReducer'
import Matcher from 'found/lib/Matcher'

import routes from './routes'

function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function createReduxStore({initialState, historyProtocol}) {
  const store = createStore(
    combineReducers({
      counter,
      found: foundReducer,
    }),
    initialState,
    composeEnhancers(
      createHistoryEnhancer({
        protocol: historyProtocol,
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(
        new Matcher(routes),
      ),
      applyMiddleware(thunk, promiseMiddleware())
    ),
  )
  store.dispatch(FarceActions.init())
  return store
}
