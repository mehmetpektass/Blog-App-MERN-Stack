import express from 'express';
import { create, deletePost, getPost } from '../controllers/post.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const postRouter = express.Router();

postRouter.post('/create' , verifyUser, create);
postRouter.get('/getPost' , getPost)
postRouter.delete('/deletePost/:postId/:userId' , verifyUser , deletePost)

export default postRouter;