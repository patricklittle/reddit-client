import React, { useState } from 'react'
import Voting from './Voting'
import formatTime from '../utils/formatTime'
import decodeHTML from '../utils/decodeHTML'

const style = {
  Wrap: {
    display: 'flex',
    background: '#f9f9f9',
    flex: 1,
    marginBottom: '1rem',
    padding: '1rem 0 0 1rem'
  },
  Comment: {
    flex: 1
  },
  ReplyTextarea: {
    width: '100%'
  },
  Button: {
    fontSize: 'smaller',
    fontWeight: 'bold',
    padding: '0.5rem 0.75rem'
  },
  ReplyButton: {
    background: 'gold'
  },
  SmallBold: {
    fontSize: 'smaller',
    fontWeight: 'bold'
  },
  ReplyForm: {
    background: '#f3f3f3',
    padding: '1rem'
  },
  MoreReplies: {
    margin: '1rem 0',
    fontSize: 'smaller',
    fontWeight: 'bold'
  }
}

export default function Comment({
  author,
  body_html,
  replies,
  score,
  created_utc,
  count
}) {
  const [comments, setComments] = useState(
    replies && replies.data && replies.data.children
  )
  const [{ showReplyForm }, setShowReplyForm] = useState({})
  const replyText = React.createRef()
  const timeago = formatTime(created_utc)
  const Content = (
    <div
      style={style.Content}
      dangerouslySetInnerHTML={{ __html: decodeHTML(body_html) }}
    />
  )

  const Replies =
    comments &&
    comments.length &&
    comments.map(comment => <Comment {...comment.data} key={comment.data.id} />)

  function toggleReplyForm() {
    setShowReplyForm({ showReplyForm: !showReplyForm })
  }

  function handleSubmit() {
    const replyContent = '<p>' + replyText.current.value + '</p>'

    if (replyContent) {
      const timestamp = Math.round(new Date().getTime() / 1000)
      const newComment = {
        data: {
          author: 'Username',
          body_html: replyContent,
          replies: {},
          score: 0,
          created_utc: timestamp,
          id: timestamp
        }
      }

      setComments(prev => {
        let update = prev ? [...prev] : []
        update.unshift(newComment)
        return update
      })

      toggleReplyForm()
    }
  }

  const ReplyForm = (
    <div style={style.ReplyForm}>
      <textarea ref={replyText} style={style.ReplyTextarea} />
      <button onClick={toggleReplyForm} name="cancel" style={style.Button}>
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        name="save"
        style={{ ...style.Button, ...style.ReplyButton }}
      >
        Save
      </button>
    </div>
  )

  if (author) {
    return (
      <div style={style.Wrap}>
        <Voting score={score} />
        <div style={style.Comment}>
          <div style={style.SmallBold}>
            {author} {score} points {timeago}
          </div>
          {Content}
          <div>
            <div onClick={toggleReplyForm} style={style.SmallBold}>
              Reply
            </div>
          </div>
          {showReplyForm && ReplyForm}
          {Replies}
        </div>
      </div>
    )
  } else {
    return <div style={style.MoreReplies}>{count} more replies</div>
  }
}
