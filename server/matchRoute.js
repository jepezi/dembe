// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {flushModuleIds} from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import {Provider} from 'react-redux'
import {Actions as FarceActions, ServerProtocol} from 'farce'
import {getStoreRenderArgs, RedirectException} from 'found'
import {RouterProvider} from 'found/lib/server'

import createReduxStore from '../web/createReduxStore'
import {render, createResolver} from '../web/router'
import {ServerFetcher} from '../web/fetcher'

async function matchRoute(req: any, {stats}: any) {
  const store = createReduxStore({
    historyProtocol: new ServerProtocol(req.url),
  })
  const matchContext = { store }
  const fetcher = new ServerFetcher('http://localhost:8000/api/graphql')
  let renderArgs

  try {
    renderArgs = await getStoreRenderArgs({
      store,
      matchContext,
      resolver: createResolver(fetcher),
    })
  } catch (e) {
    if (e instanceof RedirectException) {
      return {
        redirect: {
          url: store.farce.createHref(e.location),
        },
      }
    }

    throw e
  } finally {
    store.dispatch(FarceActions.dispose())
  }

  const element = (
    <Provider store={store}>
      <RouterProvider router={renderArgs.router}>
        {render(renderArgs)}
      </RouterProvider>
    </Provider>
  )

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
    reduxData: store.getState(),
    relayData: fetcher,
  }
}

export default matchRoute
