// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { flushModuleIds } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import routes from '../web/routes'
import {getFarceResult} from 'found/lib/server'
import {ServerFetcher} from '../web/fetcher'
import {historyMiddlewares, render, createResolver} from '../web/router'

async function matchRoute(req: any, {stats}: any) {
  const fetcher = new ServerFetcher('http://localhost:8000/api/graphql')

  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig: routes,
    resolver: createResolver(fetcher),
    render,
  })

  if (redirect) {
    return {redirect}
  }

  const content = ReactDOMServer.renderToString(element)

  const moduleIds = flushModuleIds()
  const { js, styles } = flushChunks(stats, {
    moduleIds,
    before: ['vendor'],
    after: ['main'],
  })

  return {
    content,
    scripts: js,
    styles,
    data: fetcher,
  }
}

export default matchRoute
