import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const param = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3001/users/verify/${param.id}/${param.token}`)
      setData(response.data)
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  if (data) {
    return <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative text-center" role="alert">
      <strong className="font-bold">{data.msg}</strong>
      <Link to='/login'>
        <button className='text-teal-700 hover:text-teal-800 font-medium underline text-center ml-2'><strong>Login</strong></button>
      </Link>
    </div >
  }
  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
      <strong className="font-bold">{error.response.data.msg}</strong>
    </div>
  }
}

export default VerifyEmail


