import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AddUser = ({ onClose }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()

  const options = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' }
  ];

  const usernameOnchange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setUsername(value)
    setErrors('')
  }

  const emailOnchange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setEmail(value)
    setErrors('')
  }
  const passwordOnchange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setPassword(value)
    setErrors('')
  }
  const confirmPasswordOnchange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setConfirmPassword(value)
    setErrors('')
  }

  const roleOnchange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setRole(value)
    setErrors('')
  }

  const submitAddUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/dashboard', {
        username, email, password, confirmPassword, role
      })
      setSuccess(response.data.msg)
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.msg)
      }
    }
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20000] outline-none focus:outline-none"
      >
        <div className="relative w-5/12  my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="font-bold text-base md:text-lg text-textSecondary">
                Add User
              </h3>
            </div>
            {/*body*/}
            <div className="p-6">

              <form onSubmit={submitAddUser} className="w-full max-w-lg" action='#'>

                {
                  errors && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <strong className="font-bold">{errors}</strong>
                    </div>
                  )
                }

                {
                  success && (
                    <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <strong className="font-bold">{success}</strong>
                    </div>
                  )
                }

                <div className='flex flex-wrap -mx-3 mb-6'>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                      className="block mb-2 text-textSecondary text-sm font-medium">Username</label>
                    <input type="username" name="username"
                      className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                      placeholder="username" value={username} onChange={usernameOnchange} />
                  </div>
                  <div className='w-full md:w-1/2 px-3'>
                    <label
                      className="block mb-2 text-textSecondary text-sm font-medium">Email</label>
                    <input type="username" name="username"
                      className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                      placeholder="your email" value={email} onChange={emailOnchange} />
                  </div>
                </div>
                <div className='mb-6'>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Password</label>
                  <input type="password" name="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={password} onChange={passwordOnchange}
                  />
                </div>

                <div className='mb-6'>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Confirm Password</label>
                  <input type="password" name="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={confirmPassword} onChange={confirmPasswordOnchange}
                  />
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block mb-2 text-sm font-medium text-textSecondary">
                      User Role
                    </label>
                    <div className="relative">
                      <select value={role} onChange={roleOnchange} className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 py-3 px-4 pr-8leading-tight focus:outline-none rounded-lg focus:bg-white focus:border-gray-500" id="grid-state">
                        {/* <option value={false}>Select Role</option> */}
                        {options.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))

                        }

                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit"
                  className="w-full bg-teal-500 text-gray-50 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5">Submit</button>

              </form>

            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Link to='/dashboard'
                className="text-textSecondary font-medium rounded-lg text-sm px-4 py-2 hover:text-red-600"
                type="button"
              >
                Close
              </Link>
              {/* <button
                className="text-textSecondary hover:text-white border border-gray-400 hover:bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-1 md:mr-2"
                type="button"

              >
                Submit
              </button> */}
            </div>

          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default AddUser