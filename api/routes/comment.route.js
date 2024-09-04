import express from 'express';
import { createComment, getComments } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const commentRouter = express.Router();

commentRouter.post('/create' , verifyUser ,createComment);
commentRouter.get('/getpostcomments/:postId' , getComments)

export default commentRouter;