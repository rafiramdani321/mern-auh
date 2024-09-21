import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    token()
  })

  const token = async () => {
    try {
      await axios.get('http://localhost:3001/token')
      setIsLogin(true)
    } catch (error) {
      if (error.response) {
        setIsLogin(false)
      }
    }
  }


  const Logout = async () => {
    try {
      await axios.delete('http://localhost:3001/logout')
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Fragment>
      <div className="container">
        <div className="flex justify-between relative">
          <nav className="bg-gray-200 px-2 sm:px-4 py-2.5 fixed w-full z-50 top-0 left-0 border-b border-gray-300">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
              <a href="/" className="flex items-center">
                <img src='/img/logo.png' className="mr-1 h-7 md:h-8" alt="Flowbite Logo" />
                <span
                  className="self-center text-xl font-bold whitespace-nowrap text-textSecondary md:text-2xl">OnShop</span>
              </a>

              {isLogin ? (
                <div className="flex md:order-2">
                  <button onClick={Logout}
                    className="text-textSecondary hover:text-white border border-gray-400 hover:bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 mt-1 md:mr-2">Logout</button>
                </div>
              ) : (
                <div className="flex md:order-2">
                  <a href="/login"
                    className="text-textSecondary font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 mt-1 md:mr-2 hover:text-primary">Sign
                    in</a>
                  <a href="/register"
                    className="text-white bg-primary hover:bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 font-medium rounded-md text-sm px-2 py-2 md:px-4 md:py-2.5 mr-1 mt-1 md:mr-2">Sign
                    up</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex justify-between relative mt-14">
          <nav className="bg-transparent sm:px-4 py-2.5 rounded">
            <div className="flex flex-wrap justify-between items-center mx-auto">
              <div className="flex md:order-2">
                <button data-collapse-toggle="navbar-cta" type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-3"
                  aria-controls="navbar-cta" aria-expanded="false" onClick={toggleMenu}>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlnss="http://www.w3.org/2000/svg">
                    <path
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    ></path>
                  </svg>
                </button>
                <div className="relative md:block mt-1">
                  <form>
                    <div className="flex">
                      <div className="relative w-full">
                        <input type="text" id="search"
                          className="block p-2.5 w-64 h-8 font-medium text-xs text-gray-800 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-gray-300 focus:border-gray-300"
                          placeholder="Search" required />

                        <a href="#">
                          <button type="submit"
                            className="absolute bg-teal-500 -top-0 -right-2 rounded-r-lg text-white font-medium text-sm p-2 border-teal-500 h-8">
                            <span><svg className="w-5 h-5" fill="none" stroke="currentColor"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg></span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`${isOpen ? 'block' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1`}
                id="navbar-cta">
                <ul
                  className="flex flex-col p-4 mt-4 bg-gray-200 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                  <li>
                    <a href="#"
                      className="block py-2 pr-4 pl-3 text-gray-500 rounded hover:text-teal-600 md:p-0"
                      aria-current="page">Home</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block py-2 pr-4 pl-3 text-gray-500 rounded hover:text-teal-600 md:p-0">About</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block py-2 pr-4 pl-3 text-gray-500 rounded hover:text-teal-600 md:p-0">Services</a>
                  </li>
                  <li>
                    <a href="#"
                      className="block py-2 pr-4 pl-3 text-gray-500 rounded hover:text-teal-600 md:p-0">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

        </div>
      </div >
    </Fragment >
  )
}

export default Navbar
