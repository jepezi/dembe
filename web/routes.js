import universal from 'react-universal-component'
import {graphql} from 'react-relay'
import App from './App/App'

const AsyncHome = universal(() => import('./Home/Home'), {
  resolve: () => require.resolveWeak('./Home/Home')
})
const AsyncAbout = universal(() => import('./About/About'), {
  resolve: () => require.resolveWeak('./About/About')
})

const routes = [{
  path: '/',
  Component: App,
  children: [
    {
      Component: AsyncHome,
      query: graphql`
        query routes_Home_Query {
          viewer {
            ...Home_viewer
          }
        }
      `
    },
    {
      path: 'about',
      Component: AsyncAbout,
    },
  ],
}]

export default routes
