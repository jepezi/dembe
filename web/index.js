// @flow
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import routes from './routes'
import configureStore from './configureStore'

const store = configureStore()

match(
  {history: browserHistory, routes},
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>,
      document.getElementById('app')
    )
  }
)
