// @flow
import React from 'react'
import PostList from 'Posts/PostList'

class Home extends React.Component {
  state = {isLoading: false, data: null}
  componentDidMount() {
    this.setState({isLoading: true})
    fetch('http://jsonplaceholder.typicode.com/posts?userId=1')
      .then(r => r.json())
      .then(r => this.setState({data: r, isLoading: false}))
  }
  render() {
    const {isLoading, data} = this.state
    return (
      <div>
        <h1>Latest Posts</h1>
        <div>
          {isLoading && <div>Loading...</div>}
          <PostList data={data} />
        </div>
      </div>
    )
  }
}

export default Home
