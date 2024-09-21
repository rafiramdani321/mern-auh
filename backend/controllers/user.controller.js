const Users = require('../models/user.model')
const Token = require('../models/token.model')
const crypto = require('crypto')
const bcryptjs = require('bcryptjs')
const sendEmail = require('../config/verifEmail')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// GET users
exports.getUser = async (req, res) => {
  try {
    const users = await Users.find({ verfied: true, role: 'user' }).select('username email role')
    res.json(users)
  } catch (error) {
    console.log(error)
  }
}

// User Register
exports.RegisterUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body

    const duplikatUsername = await Users.findOne({ username })
    if (duplikatUsername) return res.status(400).json({
      status: false, msg: 'Username has been registered!'
    })

    const duplikatEmail = await Users.findOne({ email })
    if (duplikatEmail) return res.status(400).json({
      status: false, msg: 'Email has been registered!'
    })

    if (password !== confirmPassword) return res.status(400).json({
      msg: 'Password confirmation is incorrect'
    })

    const hashPassword = await bcryptjs.hash(password, 10)

    const user = await new Users({
      username, email, password: hashPassword
    })
    user.save()

    // 3600000 // 1 Jam
    const tokenExp = Date.now() + 3600000 // 1 Jam

    const Usertoken = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
      verifyExp: tokenExp
    }).save()

    const message = `${process.env.BASE_URL}/users/verify/${user._id}/${Usertoken.token}`
    await sendEmail(user.email, 'verify email', message)
    return res.status(200).json({
      msg: 'Registration has been successful, Please verify your email!'
    })
  } catch (error) {
    console.log(error)
  }
}

// Cek expToken pada database, jika user tidak melalakukan verif email
// exports.checkExpiredTokens = async () => {
//   try {
//     const tokens = await Token.findOne({ verifyExp: { $lt: Date.now() } })
//     if (tokens) {
//       await Token.deleteMany({ _id: { $in: tokens } })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
// setInterval(this.checkExpiredTokens, 10000)

// verifikasi email user


// Login User
exports.LoginUser = async (req, res) => {
  try {
    const user = await Users.find({ email: req.body.email })
    const match = await bcryptjs.compare(req.body.password, user[0].password)
    if (!match) return res.status(400).json({ msg: 'Wrong password' })
    const verifyUser = await Users.findOne({ _id: user[0]._id, verfied: true })
    if (!verifyUser) return res.status(400).json({ msg: 'Account not verified, please cek your email!' })
    const userId = user[0]._id
    const name = user[0].username
    const email = user[0].email
    const role = user[0].role
    const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
    await Users.updateMany({ _id: userId }, { $set: { refresh_token: refreshToken } })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true -> jika https
    })
    res.json({ accessToken })
  } catch (error) {
    res.status(404).json({ msg: 'Wrong email' })
  }
}

// Logout User
exports.Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await Users.find({ refresh_token: refreshToken })
    if (!user[0]) return res.status(204)
    const userId = user[0]._id
    await Users.updateMany({ _id: userId }, { $set: { refresh_token: null } })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
  }
}

// Forgot Password POST -> send Token Email
exports.ForgotPassword = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ msg: 'Email not registered!' })
    const userVerify = await Users.findOne({ email: req.body.email, verfied: true })
    if (!userVerify) return res.status(400).json({ msg: 'Email not verified, please cek your email' })

    const tokenExp = Date.now() + 3600000 // 1 Jam

    const Usertoken = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
      verifyExp: tokenExp
    }).save()

    const message = `Change Password : ${process.env.BASE_URL}/forgot-password/users/${user._id}/${Usertoken.token}`
    await sendEmail(user.email, 'forgot password', message)
    return res.status(200).json({
      msg: 'Please cek your email!'
    })
  } catch (error) {
    console.log(error)
  }
}

// Verify email Forgot Password
exports.VerifyForgotPassword = async (req, res, next) => {
  try {
    const users = await Users.findOne({ _id: req.params.id })
    const tokens = await Token.findOne({ userId: req.params.id, token: req.params.token })
    if (!users) return res.status(400).send({ msg: 'invalid link' })
    if (!tokens) return res.status(400).send({ msg: 'invalid link' })
    if (tokens.verifyExp < Date.now()) {
      await Token.findOneAndRemove({ userId: req.params.id, token: req.params.token })
      return res.status(400).send({ msg: 'Token Expired' })
    }
    return res.status(200).json({ msg: 'valid link' })
  } catch (error) {
    res.status(400).send({ msg: 'invalid link' })
  }
}

// Change Password validation
exports.ChangePassword = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) return res.status(400).json({
      msg: 'Password confirmation is incorrect'
    })

    const token = await Token.findOne({ userId: req.params.id, token: req.params.token })
    if (!token) return res.status(400).json({ msg: 'invalid link' })

    const hashPassword = await bcryptjs.hash(req.body.password, 10)

    await Users.findOneAndUpdate({ _id: req.params.id }, { $set: { password: hashPassword } })
    await Token.findOneAndRemove({ userId: req.params.id, token: req.params.token })

    return res.status(200).json({ msg: 'password changed successfully, please login' })
  } catch (error) {
    res.status(400).send({ msg: 'invalid link' })
  }
}