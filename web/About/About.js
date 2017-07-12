// @flow
import React from 'react'

class About extends React.Component {
  state = {count: 0}
  render() {
    return (
      <div>
        <h1>About</h1>
        <div>
          <div>
            We are pug lover community. All things pugs.
          </div>
          <button onClick={this._handleClick}>Click {this.state.count}</button>
        </div>
      </div>
    )
  }
  _handleClick = () => {
    this.setState(s => ({count: s.count + 1}))
  }
}

export default About
