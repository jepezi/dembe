// @flow
import React from 'react'
import {connect} from 'react-redux'
import PostList from 'Posts/PostList'
import {loadPosts} from '../actions'

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadPosts())
  }
  render() {
    const {posts} = this.props
    console.warn(posts)
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

export default connect(
  mapState,
)(Home)
