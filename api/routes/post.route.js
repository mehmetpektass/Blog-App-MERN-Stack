import express from 'express';
import { create } from '../controllers/post.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const postRouter = express.Router();

postRouter.post('/create' , verifyUser, create);

export default postRouter;