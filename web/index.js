// @flow
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {match, Router, browserHistory} from 'react-router'
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo'
import routes from './routes'
// import configureStore from './configureStore'

// const store = configureStore({initialState: window.__REDUXDATA__})

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/api/graphql'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

match(
  {history: browserHistory, routes},
  (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <Router {...renderProps} />
      </ApolloProvider>,
      document.getElementById('app')
    )
  }
)
