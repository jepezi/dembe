import App from './App/App'
import universal from 'react-universal-component'

const AsyncHome = universal(() => import('./Home/Home'), {
  resolve: () => require.resolveWeak('./Home/Home')
})
const AsyncAbout = universal(() => import('./About/About'), {
  resolve: () => require.resolveWeak('./About/About')
})

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: AsyncHome,
  },
  childRoutes: [
    {
      path: 'about',
      component: AsyncAbout,
    },
  ],
}

export default routes
