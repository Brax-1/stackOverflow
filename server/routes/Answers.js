import express from "express"

import { postAnswer, deleteAnswer, AddComment } from '../controllers/Answers.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/post/:id', auth, postAnswer)
router.patch('/comment/:id',auth, AddComment)
router.patch('/delete/:id', auth, deleteAnswer)

export default router