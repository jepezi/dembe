// @flow
import React from 'react'
import {connect} from 'react-redux'
import PostList from 'Posts/PostList'
import {loadPosts} from '../actions'
import fetchData from '../fetchData'

class Home extends React.Component {
  render() {
    const {posts} = this.props
    return (
      <div>
        <h1>Latest Posts</h1>
        <div>
          {!posts.data && <div>Loading...</div>}
          <PostList data={posts.data} />
        </div>
      </div>
    )
  }
}

function mapState(s) {
  return {
    posts: s.posts,
  }
}

const Connected = connect(
  mapState,
)(Home)

const Prefetched = fetchData(store => {
  return store.dispatch(loadPosts())
})(Connected)

export default Prefetched
