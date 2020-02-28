import React, { useState, useEffect } from 'react'
import Feed from './Feed'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://www.reddit.com/r/all.json')
      .then(res => res.json())
      .then(json => {
        setPosts(json.data.children)
      })
  }, [])

  return (
    <div>
      <Feed posts={posts} />
    </div>
  )
}
