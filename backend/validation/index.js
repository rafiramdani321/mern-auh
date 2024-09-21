const { validationResult, check } = require('express-validator')

// Error validator
exports.Validator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      msg: errors.array()[0].msg
    })
  }
  next()
}

// Register Validator
exports.RegisterValidator = [
  check('username', 'Username is required!').notEmpty(),
  check('email', 'Email is required!').notEmpty()
    .isEmail().withMessage('Email not valid!'),
  check('password', 'Password is required!').notEmpty()
    .isLength({ min: 6 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain a number')
]

exports.LoginValidator = [
  check('email', 'Email is required!').notEmpty(),
  check('password', 'password is required!').notEmpty()
]

exports.ForgotPasswordValidator = [
  check('email', 'Email is required!').notEmpty()
]

exports.ChangePasswordValidator = [
  check('password', 'Password is required!').notEmpty()
    .isLength({ min: 6 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain a number')
]


// ADMIN
// Add User
exports.AddUserValidator = [
  check('username', 'Username is required!').notEmpty(),
  check('email', 'Email is required!').notEmpty()
    .isEmail().withMessage('Email not valid!'),
  check('password', 'Password is required!').notEmpty()
    .isLength({ min: 6 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain a number'),
  check('role', 'Please select role!').notEmpty()
]

// Update User
exports.UpdateUserValidator = [
  check('username', 'Usernama is required!').notEmpty(),
  check('email', 'Email is required!').notEmpty()
    .isEmail().withMessage('Email not valid!'),
  check('role', 'Selected role').notEmpty()
]