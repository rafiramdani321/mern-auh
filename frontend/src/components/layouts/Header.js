import React from 'react'
import Navbar from './Navbar'

function Header() {
  return (
    <div>
      <header className="bg-white absolute top-0 left-0 w-full flex items-center z-[10000]">
        <Navbar />
      </header>
    </div>
  )
}

export default Header
