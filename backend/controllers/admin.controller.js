const Users = require('../models/user.model')
const Tokens = require('../models/token.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmail = require('../config/verifEmail')
const { check } = require('express-validator')
require('dotenv').config()

// Add User
exports.AddUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body

    const duplikatUsername = await Users.findOne({ username })
    if (duplikatUsername) return res.status(400).json({
      msg: 'Username has been registered!'
    })

    const duplikatEmail = await Users.findOne({ email })
    if (duplikatEmail) return res.status(400).json({
      msg: 'Email has been registered!'
    })

    if (password !== confirmPassword) return res.status(400).json({
      msg: 'Password confirmation is incorrect!'
    })

    const hashPassword = await bcryptjs.hash(password, 10)

    const tokenExp = Date.now() + 3600000 // 1 jam

    const user = await new Users({
      username, email, password: hashPassword, role
    }).save()

    const UserToken = await new Tokens({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
      verifyExp: tokenExp
    }).save()

    const message = `${process.env.BASE_URL}/users/verify/${user._id}/${UserToken.token}`
    await sendEmail(user.email, 'verify email', message)

    return res.status(200).json({
      msg: 'User has been added, Please verify email!', user
    })
  } catch (error) {
    console.log(error)
  }
}

// Get User ByID
exports.GetUserById = async (req, res) => {
  try {
    const updateUser = await Users.findOne({ _id: req.params.id })
    return res.status(200).json(updateUser)
  } catch (error) {
    console.log(error)
  }
}

exports.EditUser = async (req, res) => {
  try {
    const duplikat = await Users.findOne({ username: req.body.username })
    if (duplikat && req.body.username !== req.body.oldUsername) return res.status(400).json({ msg: 'username has been used' })
    await Users.updateOne({ _id: req.params.id }, { $set: req.body })
    return res.status(200).json({ msg: 'User has been successfully updated' })
  } catch (error) {
    console.log(error)
  }
}

exports.DeleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({ status: true, msg: 'User has been deleted!' })
  } catch (error) {
    console.log(error)
  }
}