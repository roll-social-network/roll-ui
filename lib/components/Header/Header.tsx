import React from 'react'

interface HeaderProps {
  title?: String
}

export const Header = ({ title = 'roll' }: HeaderProps) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
export default Header
