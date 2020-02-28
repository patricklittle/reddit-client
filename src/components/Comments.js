import React from 'react'
import Comment from './Comment'

const style = {
  background: '#f1f1f1',
  padding: '1em'
}

export default function Comments({ comments }) {
  return (
    <div style={style}>
      <h2>Comments</h2>
      {comments.map(comment => (
        <Comment {...comment.data} key={comment.data.id} />
      ))}
    </div>
  )
}
