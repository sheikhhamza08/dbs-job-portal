import express from "express";
import {
  applyJob,
} from "../controllers/application.controllers.js";
import authUser from "../middlewares/authUser.js";

const applicantionRouter = express.Router();

applicantionRouter.post("/apply/:id", authUser, applyJob);
export default applicantionRouter;
