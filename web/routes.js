import App from './App/App'

function loadRoute(cb) {
  return (module) => cb(null, module.default)
}

function errorLoadRoute(err) {
  console.log("Chunk loading failed", err)
}

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    getComponent(nextState, cb) {
      import('./Home/Home').then(loadRoute(cb)).catch(errorLoadRoute)
    },
  },
  childRoutes: [
    {
      path: 'about',
      getComponent(nextState, cb) {
        import('./About/About').then(loadRoute(cb)).catch(errorLoadRoute)
      },
    },
  ],
}

export default routes
