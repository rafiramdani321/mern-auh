import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const EditUser = () => {
  const [username, setUsername] = useState('')
  const [oldUsername, setOldUsername] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [success, setSucces] = useState('')
  const [errors, setErrors] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getUserById()
  }, [])

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:3001/dashboard/users/${id}`)
    setUsername(response.data.username)
    setOldUsername(response.data.username)
    setEmail(response.data.email)
    setRole(response.data.role)
  }

  const onchangeUsername = (e) => {
    e.preventDefault()
    const value = e.target.value
    setUsername(value)
    setErrors('')
  }

  const onchangeEmail = (e) => {
    e.preventDefault()
    const value = e.target.value
    setEmail(value)
    setErrors('')
  }

  const onchangeRole = (e) => {
    const value = e.target.value
    setRole(value)
    setErrors('')
  }

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:3001/dashboard/users/edit/${id}`, {
        username, email, role, oldUsername
      })
      setSucces(response.data.msg)
      setTimeout(() => {
        navigate('/dashboard')
        window.location.reload()
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
                Edit User
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <form onSubmit={updateUser} class="w-full max-w-lg">

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

                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block mb-2 text-textSecondary text-sm font-medium" for="grid-first-name">
                      Username
                    </label>
                    <input class="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5" type="text" placeholder="Your name" value={username} onChange={onchangeUsername} />
                    <input type='hidden' value={oldUsername} onChange={onchangeUsername} disabled />
                  </div>
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block mb-2 text-textSecondary text-sm font-medium" for="grid-first-name">
                      Email
                    </label>
                    <input class="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5" type="text" placeholder="Your email" value={email} onChange={onchangeEmail} />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      User Role
                    </label>
                    <div class="relative">
                      <select class="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 py-3 px-4 pr-8leading-tight focus:outline-none rounded-lg focus:bg-white focus:border-gray-500" id="grid-state" value={role} onChange={onchangeRole}>
                        <option>user</option>
                        <option>admin</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
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
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default EditUser