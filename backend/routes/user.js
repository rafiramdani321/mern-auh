const express = require('express')
const router = express.Router()
const { getUser, RegisterUser, LoginUser, Logout, ForgotPassword, VerifyForgotPassword, ChangePassword } = require('../controllers/user.controller')
const { Validator, LoginValidator, RegisterValidator, ForgotPasswordValidator, ChangePasswordValidator, AddUserValidator, UpdateUserValidator } = require('../validation/index')
const { VerifyTokenAuth, verifyEmail } = require('../middleware/middleware')
const { refreshToken } = require('../controllers/refreshToken')
const { AddUser, GetUserById, EditUser, DeleteUser } = require('../controllers/admin.controller')

// GET user
router.get('/users', VerifyTokenAuth, getUser)

// POST Register
router.post('/register', RegisterValidator, Validator, RegisterUser)

// GET Verifikasi Email
router.get('/users/verify/:id/:token', verifyEmail)

// POST Login
router.post('/login', LoginValidator, Validator, LoginUser)

// GET Refresh Token
router.get('/token', refreshToken)

// DELETE Logout
router.delete('/logout', Logout)

// POST Forgot Password
router.post('/forgot-password', ForgotPasswordValidator, Validator, ForgotPassword)

// GET Verifikasi email Forgot Password
router.get('/forgot-password/users/:id/:token', VerifyForgotPassword)

// PUT Verifikasi email Forgot Password
router.post('/change-password/users/:id/:token', ChangePassword, ChangePasswordValidator, Validator)

// ADMIN
// POST Add User
router.post('/dashboard', AddUserValidator, Validator, AddUser)

// GET Edit User
router.get('/dashboard/users/:id', GetUserById)

// PUT Edit User
router.put('/dashboard/users/edit/:id', UpdateUserValidator, Validator, EditUser)

// DELETE user
router.delete('/dashboard/users/delete/:id', DeleteUser)

module.exports = router