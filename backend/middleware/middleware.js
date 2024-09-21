const jwt = require('jsonwebtoken')
const Users = require('../models/user.model')
const Token = require('../models/token.model')

exports.VerifyTokenAuth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403)
    if (decoded.role !== 'admin') return res.sendStatus(204)
    // console.log(decoded.role)
    req.email = decoded.email
    next()
  })
}

exports.verifyEmail = async (req, res) => {
  try {
    const users = await Users.findOne({ _id: req.params.id })
    const tokens = await Token.findOne({ userId: req.params.id, token: req.params.token })
    if (!users) return res.status(400).send({ msg: 'invalid link' })
    if (!tokens) return res.status(400).send({ msg: 'invalid link' })
    if (tokens.verifyExp < Date.now()) {
      await Token.findOneAndRemove({ userId: req.params.id, token: req.params.token })
      await Users.findOneAndRemove({ _id: req.params.id })
      return res.status(400).send({ msg: 'Token Expired, please re-registered!' })
    }
    await Users.updateOne({ _id: req.params.id }, { $set: { verfied: true } })
    await Token.findOneAndRemove({ userId: req.params.id, token: req.params.token })
    return res.status(200).send({ msg: 'Account has been actived, please login!' })
  } catch (error) {
    res.status(400).send({ msg: 'invalid link' })
  }
}