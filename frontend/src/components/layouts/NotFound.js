import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#3b3f51]">
        <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
        <div className="bg-[#1A2238] text-primary px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <a
            className="relative inline-block text-sm font-medium text-primary group active:text-primary focus:outline-none focus:ring"
          >
            <span
              className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to='/'>Go Home</Link>
            </span>
          </a>
        </button>
      </main>
    </div>
  )
}

export default NotFound
