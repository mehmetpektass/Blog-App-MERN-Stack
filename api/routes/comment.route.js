import express from 'express';
import { createComment, editComment, getComments, likeComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const commentRouter = express.Router();

commentRouter.post('/create' , verifyUser ,createComment);
commentRouter.get('/getpostcomments/:postId' , getComments);
commentRouter.put('/likecomment/:commentId', verifyUser , likeComment);
commentRouter.put('editcomment/:commentId' , verifyUser , editComment)

export default commentRouter;