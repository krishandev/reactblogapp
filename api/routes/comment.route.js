import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createComment, deleteComment, editComment, getPostsComments, getcomments, likeComment } from '../controllers/comment.controller.js';

const router=express.Router();

router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId', getPostsComments)
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)
router.get('/getcomments', verifyToken, getcomments)

export default router;
