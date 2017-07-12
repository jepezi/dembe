import React from 'react'
import Post from './Post'

const PostList = props => {
  const {data} = props
  return (
    <div>
      {data && data.map(e =>
        <Post
          key={`post_${e.title}`}
          data={e}
        />
      )}
    </div>
  )
}

export default PostList
