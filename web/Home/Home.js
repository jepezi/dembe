// @flow
import React from 'react'
import {gql, graphql} from 'react-apollo'
import PostList from 'Posts/PostList'

class Home extends React.Component {
  render() {
    const {data: {viewer, error, loading}} = this.props
    if (error != null) {
      return (
        <p>There is error</p>
      )
    }
    return (
      <div>
        <h1>Latest Posts</h1>
        <div>
          {loading && <div>Loading...</div>}
          {viewer && <PostList data={viewer.posts} />}
        </div>
      </div>
    )
  }
}

const WithData = graphql(gql`
  query {
    viewer {
      id
      posts {
        id
        title
        description
      }
    }
  }
`)(Home)

export default WithData
