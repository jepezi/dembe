import React from 'react'

const Post = props => {
  const {data} = props
  return (
    <div>
      <h3>{data.title}</h3>
      <div>{data.body}</div>
    </div>
  )
}

export default Post
