import React from 'react'
import Logo from '../resources/logo.png'

const Header = () => {
  return (
    <header>
      <img className="logo" src={Logo} alt="Spring Market" />
    </header>
  )
}

export default Header