import express from 'express'
import { createPost, getAllPost, upDatePost } from '../controller/postsController.js'
import { adminProtect, protect } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/posts')
.get(getAllPost)
.post(protect ,adminProtect,createPost)

router.route('/posts/:id').put(protect ,adminProtect,upDatePost)

export default router