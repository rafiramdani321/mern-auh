import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ChangePassword = () => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
    setErrors('')
  }
  const onChangeConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    setErrors('')
  }

  const changePassword = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3001/change-password/users/${params.id}/${params.token}`, { password, confirmPassword })
        .then(resolve => {
          setPassword('')
          setConfirmPassword('')
          setSuccess(resolve.data.msg)
          setTimeout(() => {
            setSuccess('')
            navigate('/login')
          }, 5000)
        })
    } catch (error) {
      setErrors(error.response.data.msg)
    }
  }

  return (
    <div>
      <section className="bg-gray-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-textSecondary text-center">
                Change Pasword
              </h1>
              <form onSubmit={changePassword} className="space-y-4 md:space-y-6">

                {
                  errors && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">{errors}</strong>
                    </div>
                  )
                }
                {
                  success && (
                    <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">{success}</strong>
                    </div>
                  )
                }

                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Password</label>
                  <input type="password" name="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={password} onChange={onChangePassword}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-textSecondary">Confirm Password</label>
                  <input type="password" name="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={confirmPassword} onChange={onChangeConfirmPassword}
                  />
                </div>
                <button type="submit"
                  className="w-full bg-teal-500 text-gray-50 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                  up</button>
                <p className="text-sm font-light text-gray-500">
                  have an account yet? <a href="/login"
                    className="font-medium text-primary-600 hover:underline" target="">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div >
      </section >
    </div>
  )
}

export default ChangePassword
