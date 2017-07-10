// @flow
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import routes from './routes'

match(
  {history: browserHistory, routes},
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Router {...renderProps} />,
      document.getElementById('app')
    )
  }
)
