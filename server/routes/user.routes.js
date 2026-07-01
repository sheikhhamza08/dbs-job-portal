import express from "express";
import {
  downloadResume,
  getMe,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controllers.js";
import { singleUpload } from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/me", authUser, getMe);
userRouter.get("/resume/:userId", authUser, downloadResume);
userRouter.get("/resume", authUser, downloadResume);
userRouter.post("/profile/update", authUser, singleUpload, updateProfile);

export default userRouter;
