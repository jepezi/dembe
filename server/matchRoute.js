// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../web/routes'

function matchRoute(req: any, res: any) {
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
          const element = <RouterContext {...renderProps} />
          const content = ReactDOMServer.renderToString(element)
          resolve({content})
        } else {
          console.warn('not found', req.url)
        }
      }
    )
  })
}

export default matchRoute
