import React from 'react'

const Navbar = ({data}) => {
  return (
    <div>
      <div className="nav">
        <img src="\images.jpeg" height={50} alt="" />
        <h4>{data}</h4>
        
      </div>
    </div>
  )
}

export default Navbar
