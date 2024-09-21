import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const VerifyForgotPassword = () => {
  const [success, setSuccess] = useState(null)
  const [errors, setErrors] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getVerifyLink()
  }, [])

  const getVerifyLink = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/forgot-password/users/${params.id}/${params.token}`)
      setSuccess(response.data.msg)
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.msg)
      }
    }
  }

  return (
    <div >
      {errors && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <strong class="font-bold">{errors}</strong>
        </div>
      )}
      {
        success && (
          navigate(`/change-password/users/${params.id}/${params.token}`)
        )
      }
    </div >
  )
}

export default VerifyForgotPassword
