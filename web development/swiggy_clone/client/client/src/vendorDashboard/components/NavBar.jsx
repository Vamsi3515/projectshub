import React, { useState } from 'react'
import Button from './Button'
import '../../App.css'
import MenuIcon from '@mui/icons-material/Menu'

const NavBar = ({toggleSidebar, showLoginHandler, showRegisterHandler, showAuthButtons}) => {

  return (
    <div className="navSection">
      <div className="navHeader">
        <MenuIcon className='menu-icon' onClick={toggleSidebar} />
        <h1>Swiggy <span>Vendor</span></h1>
      </div>
      <div className="authentication">
        {showAuthButtons && <Button name="Login" onClick={showLoginHandler} />}
        {showAuthButtons && <Button name="SignUp" onClick={showRegisterHandler} />}
      </div>
    </div>
  )
}

export default NavBar