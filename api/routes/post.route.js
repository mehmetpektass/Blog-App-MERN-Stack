import express from 'express';
import { create } from '../controllers/post.controller';
import { verifyUser } from '../utils/verifyUser';

const postRouter = express.Router();

postRouter.post('/create' , verifyUser, create);

export default postRouter;