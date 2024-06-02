import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'

interface HeaderProps {
  title?: String
}

export const Header = ({ title = 'roll' }: HeaderProps) => {
  return (
    <header>
      <ul>
        <li><a href="#"><FontAwesomeIcon icon={faBars} /></a></li>
      </ul>
      <h1>{title}</h1>
      <ul>
        <li><a href="#"><FontAwesomeIcon icon={faUser} /></a></li>
      </ul>
    </header>
  )
}
export default Header
