// @flow
import React from 'react'
import {connect} from 'react-redux'
import css from './About.module.scss'

class About extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <h1>About</h1>
        <div>
          <div>
            We are pug lover community. All things pugs.
          </div>
          <button onClick={this.props.handleClick}>Click {this.props.count}</button>
        </div>
      </div>
    )
  }
}

function mapState(s) {
  return {
    count: s.counter,
  }
}

function mapDispatch(dispatch) {
  return {
    handleClick: () => {
      dispatch({type: 'INCREMENT'})
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(About)
