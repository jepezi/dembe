// @flow
import React from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import Post from './Post'

const PostList = props => {
  const {viewer} = props
  return (
    <div>
      {viewer.posts.map(e =>
        <Post
          key={`post_${e.title}`}
          data={e}
        />
      )}
    </div>
  )
}

export default createFragmentContainer(
  PostList,
  graphql`
    fragment PostList_viewer on Viewer {
      posts {
        id
        title
        description
      }
    }
  `,
)

// export default PostList
