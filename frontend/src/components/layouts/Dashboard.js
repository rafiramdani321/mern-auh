import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AddUser from '../admin/AddUser'
import EditUser from '../admin/EditUser'

const Dashboard = () => {
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [modalAddUser, setModalAddUser] = useState(false)
  const [modalEditUser, setModalEditUser] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    refreshToken()
    getUsers()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/token')
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      setName(decoded.name)
      setExpired(decoded.exp)
    } catch (error) {
      if (error.response) {
        navigate('/')
      }
    }
  }

  // refresh token auto
  const axiosRefresh = axios.create()
  axiosRefresh.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    if (expired * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:3001/token')
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      setName(decoded.name)
      setExpired(decoded.exp)
      if (decoded.role === 'admin') {
        setIsAdmin(true)
      }
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  const getUsers = async () => {
    try {
      const response = await axiosRefresh.get('http://localhost:3001/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUsers(response.data)
    } catch (error) {
      return false
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/dashboard/users/delete/${id}`)
      window.location.reload()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {modalAddUser ? <AddUser onClose={() => setModalAddUser(false)} /> : null}
      {modalEditUser ? <EditUser onClose={() => setModalEditUser(false)} /> : null}
      <section id="about" className="pt-40 pb-10 bg-white">
        <div className="container">
          <div className="w-full px-4">
            <h1 className="font-bold text-base md:text-lg text-textSecondary mb-1">Belanja Online Murah di Onshop</h1>
            <p className="font-normal text-sm text-textSecondary">Welcome Back : {name}
            </p>

            {isAdmin && (
              <Link to={'/dashboard/add-user'}
                className="block max-w-fit text-textSecondary hover:text-white border border-gray-400 hover:bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3">Add Users
              </Link>
            )}

            {isAdmin && (
              <div className="relative lg:w-8/12 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr className="bg-white border-b" key={user._id}>
                        <td className='px-6 py-4'>{i + 1}</td>
                        <td className='px-6 py-4'>{user.username}</td>
                        <td className='px-6 py-4'>{user.email}</td>
                        <td className='px-6 py-4'>{user.role}</td>
                        <td className='px-6 py-4'>
                          <Link to={`/dashboard/edit/${user._id}`} className='mx-1 font-semibold hover:text-primary'>Edit</Link>
                          <button onClick={() => deleteUser(user._id)} className='mx-1 font-semibold hover:text-red-600'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
