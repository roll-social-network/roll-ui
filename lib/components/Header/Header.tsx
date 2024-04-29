import React from 'react'

interface HeaderProps {
  title?: String
}

export default ({ title = 'roll' }: HeaderProps) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
