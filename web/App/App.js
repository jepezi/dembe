// @flow
import React from 'react'
import Header from 'Header/Header'
import {Link} from 'react-router'
import css from './App.module.scss'

class App extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <Header />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className={css.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
