import express from 'express'
import { AuthUser, UserSignUp } from '../controller/userController.js'

const router  = express.Router()

router.route('/signup').post(UserSignUp)
router.route('/signin').post(AuthUser)

export default router