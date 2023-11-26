import React from 'react'
import Photo from "../assets/photo.png";

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Fire Chat</span>
      <div className="user">
        <img src={Photo} alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar