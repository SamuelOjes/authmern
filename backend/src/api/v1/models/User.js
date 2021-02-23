// Require Mongoose
import mongoose from 'mongoose'
// Require Crypto
import crypto from 'crypto'
// Require Bcrypt for encrypting passwords
import bcrypt from 'bcryptjs'
// Require JsonWebToken
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, 'Please tell us your name'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, 'Please confirm your password'],
    //   validate: {
    //     // This only works on CREATE and SAVE!!!
    //     validator: function (el) {
    //       return el === this.password
    //     },
    //     message: 'Passwords are not the same!',
    //   },
    // },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// @Desc Encrypt Password Using Bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  //   Delete Password Confirm Fields
  // this.passwordConfirm = undefined

  next()
})

//@Desc Sign JWT Token to user
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  )
}

// @Desc Check User Entered password returns Hashed Password in Db during login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

// @Desc Check if user changed password after token was issued
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )

    return JWTTimestamp < changedTimestamp
  }

  // False means NOT changed
  return false
}

// @Desc Generate and Hash the Password Token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash Token and set to reset Password field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set Expiry Date for Hashed resetPassword Token
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', UserSchema)

export default User
