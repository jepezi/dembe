// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { flushModuleIds } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import {Provider} from 'react-redux'
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'
import configureStore from '../web/configureStore'
import {fetchPosts} from '../web/actions'

function matchRoute(req: any, {stats}: any) {
  const store = configureStore()
  return new Promise((resolve, reject) => {
    match(
      {routes, location: req.url},
      async (error, redirectLocation, renderProps) => {
        if (error) {
          resolve({error})
        } else if (redirectLocation) {
          resolve({
            redirect: {
              url: redirectLocation.pathname + redirectLocation.search,
            },
          })
        } else if (renderProps) {
          // Find all static method called `fetchData` and execute, then wait for all promises to resolve. Then resolve with element. At this point, the store is filled with state already.
          const prefetchMethods = renderProps.components
            .filter(c => c.fetchData)
            .reduce((acc, c) => acc.concat(c.fetchData), [])

          console.warn('prefetchMethods',prefetchMethods.length)

          const promises = prefetchMethods
            .map(prefetch => prefetch(store))

          await Promise.all(promises)

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

          resolve({
            content,
            scripts: js,
            styles,
            data: store.getState(),
          })
        } else {
          console.warn('not found', req.url)
        }
      }
    )
  })
}

export default matchRoute
