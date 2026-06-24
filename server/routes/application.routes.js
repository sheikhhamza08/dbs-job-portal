import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
} from "../controllers/application.controllers.js";
import authUser from "../middlewares/authUser.js";

const applicantionRouter = express.Router();

applicantionRouter.post("/apply/:id", authUser, applyJob);
applicantionRouter.get("/get", authUser, getAppliedJobs);
applicantionRouter.get("/:id/applicants", authUser, getApplicants);

export default applicantionRouter;
