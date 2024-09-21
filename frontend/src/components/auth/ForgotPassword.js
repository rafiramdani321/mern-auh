import axios from 'axios'
import React, { useState } from 'react'
import LoadingSpinner from '../layouts/LoadingSpinner'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
    setErrors('')
  }

  const ChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:3001/forgot-password', {
        email
      }).then(resolve => {
        setEmail('')
        setSuccess(resolve.data.msg)
        setTimeout(() => {
          setSuccess('')
        }, 5000)
      }).finally(() => {
        setLoading(false)
      })
    } catch (error) {
      if (error.response) {
        setLoading(false)
        setErrors(error.response.data.msg)
      }
    }
  }

  return (
    <div>
      {loading && (<LoadingSpinner />)}
      <section className="bg-gray-200">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-textSecondary text-center">
                Forgot Password
              </h1>
              <form onSubmit={ChangePassword} className="space-y-4 md:space-y-6">

                {
                  errors && (
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong class="font-bold">{errors}</strong>
                    </div>
                  )
                }
                {
                  success && (
                    <div class="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
                      <strong class="font-bold">{success}</strong>
                    </div>
                  )
                }

                <div>
                  <label className="block mb-2 text-textSecondary text-sm font-medium">Your
                    email</label>
                  <input type="email" name="email" id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com" value={email} onChange={onChangeEmail} />
                </div>
                <button type="submit"
                  className="w-full bg-teal-500 text-gray-50 bg-primary-600 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                  in</button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet? <a href="/register"
                    className="font-medium text-primary-600 hover:underline">Submit</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword
