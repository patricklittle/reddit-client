import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Comments from './Comments'
import Post from './Post'

export default withRouter(function Single({ location }) {
  const [post, setPost] = useState(location)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch('http://www.reddit.com/' + location.pathname + '.json')
      .then(res => res.json())
      .then(json => {
        setPost(json[0].data.children[0].data)
        setComments(json[1].data.children)
      })
  }, [location])

  return (
    <div>
      <Post {...post} />
      <Comments comments={comments} />
    </div>
  )
})
