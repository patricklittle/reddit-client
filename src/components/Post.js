import React from 'react'
import { Link } from 'react-router-dom'
import Voting from './Voting'
import formatTime from '../utils/formatTime'
import decodeHTML from '../utils/decodeHTML'

const style = {
  Post: {
    display: 'flex',
    padding: '1rem',
    background: '#fff',
    marginBottom: '1rem'
  },
  PostRow: {
    display: 'flex',
    color: '#191917',
    textDecoration: 'none'
  },
  PostThumbnail: {
    marginRight: '1rem'
  },
  PostContent: {
    flex: 1
  },
  PostTitle: {
    marginTop: 0
  },
  SmallBold: {
    fontSize: 'smaller',
    fontWeight: 'bold'
  }
}

function PostThumbnail({
  thumbnail,
  title,
  thumbnail_width,
  thumbnail_height
}) {
  if (thumbnail && !['default', 'self', 'nsfw'].includes(thumbnail)) {
    return (
      <div style={style.PostThumbnail}>
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          width={thumbnail_width}
          height={thumbnail_height}
        />
      </div>
    )
  } else {
    return null
  }
}

export default function Post(props) {
  const {
    title,
    url,
    permalink,
    author,
    subreddit_name_prefixed,
    created,
    thumbnail,
    score,
    thumbnail_width,
    thumbnail_height,
    selftext_html
  } = props

  const timeago = formatTime(created)

  if (props.inFeed) {
    return (
      <div style={style.Post}>
        <Voting score={score} />
        <Link
          to={{
            pathname: permalink,
            ...props
          }}
          style={style.PostRow}
        >
          <PostThumbnail
            {...{ thumbnail, title, thumbnail_width, thumbnail_height }}
          />
          <div style={style.PostContent}>
            <h3 style={style.PostTitle}>{title}</h3>
            <div style={style.SmallBold}>
              Submitted {timeago} by {author} to {subreddit_name_prefixed}
            </div>
          </div>
        </Link>
      </div>
    )
  } else {
    return (
      <div style={style.Post}>
        <div style={style.PostRow}>
          <Voting score={score} />
          <Link to={url}>
            <PostThumbnail
              {...{ thumbnail, title, thumbnail_width, thumbnail_height }}
            />
          </Link>
          <div style={style.PostContent}>
            <Link to={url}>
              <h3 style={style.PostTitle}>{title}</h3>
            </Link>
            <div
              dangerouslySetInnerHTML={selftext_html && { __html: decodeHTML(selftext_html) }}
            />
            <div style={style.SmallBold}>
              Submitted {timeago} by {author} to {subreddit_name_prefixed}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
