import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    createSendToken(user, 200, res)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const signUpUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(400)
    throw new Error('User already Exists')
  }

  const user = await User.create({
    email,
    username,
    password,
  })

  if (user) {
    createSendToken(user, 201, res)
  } else {
    res.status(500)
    throw new Error('Invalid user Data')
  }
})

const signInUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please Provide Email and Password')
  }
  // @desc check if user exists
  const existingUser = await User.findOne({ email }).select('+password')
  //   @des check if user doesn't exist
  if (!existingUser) {
    res.status(404)
    throw new Error('Invalid Credentials')
  }

  //@desc Check if password Match
  const isPasswordCorrect = await existingUser.matchPassword(password)
  //   @desc check if passwords do not match
  if (!isPasswordCorrect) {
    res.status(404)
    throw new Error('Invalid Credentials')
  }

  if (existingUser) {
    createSendToken(existingUser, 200, res)
  } else {
    res.status(500)
    throw new Error('Invalid Credentials')
  }
})

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    createSendToken(updatedUser, 200, res)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body

  const existingUserMail = await User.findOne({ email })

  if (!existingUserMail) {
    res.status(404)
    throw new Error('Invalid Email Address')
  }

  const resetToken = existingUserMail.getResetPasswordToken()
  await existingUserMail.save({
    validateBeforeSave: false,
  })

  const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`

  const message = `
  <h3>You have requested a password reset</h3>
 <p>Please goto this link to reset your password</p>
 <a href=${resetUrl} clicktracking=off>${resetUrl}<a/>
 `

  try {
    await sendEmail({
      email: existingUserMail.email,
      subject: 'Reset Your Account Password',
      message,
    })
    res.status(200).json({
      success: true,
      data: 'Reset Password Email Sent',
    })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({
      validateBeforeSave: false,
    })
    res.status(500)
    throw new Error('Email could not be sent')
  }
})

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  })

  if (!user) {
    res.status(404)
    throw new Error('Invalid Token')
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  // Create User token from sendTokenResponse
  createSendToken(user, 200, res)
}

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id)
  res.status(statusCode).json({
    success: true,
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  })
}

export {
  getUserProfile,
  signUpUser,
  signInUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
}
