import React from 'react'
import Post from './Post'

export default function Feed(props) {
  return (
    <div>
      {props.posts.map(post => (
        <Post {...post.data} inFeed key={post.data.id} />
      ))}
    </div>
  )
}
