import express from 'express';
import { create, deletePost, getPost, updatePost } from '../controllers/post.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const postRouter = express.Router();

postRouter.post('/create' , verifyUser, create);
postRouter.get('/getpost' , getPost)
postRouter.delete('/deletepost/:postId/:userId' , verifyUser , deletePost)
postRouter.put('/updatepost/:postId/:userId' , verifyUser , updatePost)

export default postRouter;