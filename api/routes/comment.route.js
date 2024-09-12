import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyUser, createComment);
commentRouter.get("/getpostcomments/:postId", getComments);
commentRouter.get("/getallcomments" , verifyUser , getAllComments)
commentRouter.put("/likecomment/:commentId", verifyUser, likeComment);
commentRouter.put("/editcomment/:commentId", verifyUser, editComment);
commentRouter.delete("/deletecomment/:commentId", verifyUser, deleteComment);

export default commentRouter;
