import express from "express";
import {
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
userRouter.post("/profile/update", authUser, singleUpload, updateProfile);

export default userRouter;
