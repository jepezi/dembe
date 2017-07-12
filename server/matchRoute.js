// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { flushModuleIds } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import routes from '../web/routes'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from '../web/reducers'

function matchRoute(req: any, {stats}: any) {
  const store = createStore(reducers)
  return new Promise((resolve, reject) => {
    match(
      {routes, location: req.url},
      (error, redirectLocation, renderProps) => {
        if (error) {
          resolve({error})
        } else if (redirectLocation) {
          resolve({
            redirect: {
              url: redirectLocation.pathname + redirectLocation.search,
            },
          })
        } else if (renderProps) {
          const element = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )
          const content = ReactDOMServer.renderToString(element)

          const moduleIds = flushModuleIds()
          const { js, styles } = flushChunks(stats, {
            moduleIds,
            before: ['vendor'],
            after: ['main'],
          })

          resolve({content, scripts: js, styles})
        } else {
          console.warn('not found', req.url)
        }
      }
    )
  })
}

export default matchRoute
