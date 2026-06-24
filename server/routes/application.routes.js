import express from "express";
import {
  applyJob,
  getAppliedJobs,
} from "../controllers/application.controllers.js";
import authUser from "../middlewares/authUser.js";

const applicantionRouter = express.Router();

applicantionRouter.post("/apply/:id", authUser, applyJob);
applicantionRouter.get("/get", authUser, getAppliedJobs);

export default applicantionRouter;
