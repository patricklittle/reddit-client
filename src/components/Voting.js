import React, { useState, useEffect } from 'react'
import Arrow from './Arrow'

const style = {
  PostVoting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '1rem'
  }
}

export default function Voting({ score }) {
  const [vote, setVote] = useState(null)
  const [itemScore, setScore] = useState(score)
  const color = vote === 'up' ? 'orangered' : 'blue'

  function voting(direction) {
    if (vote === null || vote !== direction) {
      setVote(direction)
      setScore(score + (direction === 'up' ? 1 : -1))
    } else {
      setVote(null)
      setScore(score)
    }
  }

  // reduce the display of scores greater than 10k
  const scoreDisplay =
    itemScore > 10000
      ? Math.round((itemScore / 1000) * 10) / 10 + 'k'
      : itemScore

  useEffect(() => {
    setScore(score)
  }, [score])

  const showScore = true

  const ArrowButton = ({ direction }) => {
    return (
      <button
        onClick={() => voting(direction)}
        name={direction}
        value={direction}
      >
        <Arrow
          direction={direction}
          color={vote && vote === direction && color}
        />
      </button>
    )
  }
  const Score = () =>
    showScore && <div style={vote && { color: color }}>{scoreDisplay}</div>

  return (
    <div style={style.PostVoting}>
      <ArrowButton direction="up" />
      <Score />
      <ArrowButton direction="down" />
    </div>
  )
}
