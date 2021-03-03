import express from 'express'
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'

import {
  getUserProfile,
  signUpUser,
  signInUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post('/signup', signUpUser)
router.route('/signin').post(signInUser)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resetToken').put(resetPassword)

export default router
