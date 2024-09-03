import express from 'express';
import { createComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const commentRouter = express.Router();

commentRouter.post('/create' , verifyUser ,createComment);

export default commentRouter;