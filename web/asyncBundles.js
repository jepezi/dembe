import React from 'react'

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null

    static loadComponent() {
      return getComponent().then(m => m.default).then(Component => {
        AsyncComponent.Component = Component
        return Component
      })
    };

    mounted = false

    state = {
      Component: AsyncComponent.Component
    }

    componentWillMount() {
      console.warn('wm',this.state.Component)
      if(this.state.Component === null) {
        AsyncComponent.loadComponent()
        .then(Component => {
          if(this.mounted) {
            this.setState({Component})
          }
        })
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    render() {
      console.warn(this.props)
      const {Component} = this.state

      if(Component !== null) {
        return (<Component {...this.props} />)
      }
      return null // or <div /> with a loading spinner, etc..
    }
  }
}

export const AsyncHome = asyncComponent(
  () => import(/* webpackChunkName: "Home" */'./Home/Home')
)

export const AsyncAbout = asyncComponent(
  () => import(/* webpackChunkName: "About" */'./About/About')
)
