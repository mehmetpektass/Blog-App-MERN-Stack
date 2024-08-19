import express from 'express'
import { deleteUser, signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const userRouter = express.Router();

userRouter.get('/test' ,test)
userRouter.put('/update/:userId' , verifyUser , updateUser)
userRouter.delete('/delete/:userId' , verifyUser , deleteUser)
userRouter.post('/signout' , signout)

export default userRouter;