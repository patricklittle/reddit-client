import React from 'react'

export default function Arrow({ color, direction }) {
  const fill = color || 'inherit'

  const style = {
    SVG: {
      transform: direction === 'down' ? 'rotate(180deg)' : '',
      width: '20px',
      height: '20px'
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={style.SVG}
    >
      <path d="M10 4.2L4.6 10h3.3v5h4.2v-5h3.3L10 4.2z" fill={fill} />
    </svg>
  )
}
