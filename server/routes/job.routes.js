import express from "express";
import {
  deleteJob,
  getAllJobs,
  getFeaturedJobs,
  getJobById,
  getJobCategories,
  getRecruiterJobs,
  postJob,
} from "../controllers/job.controllers.js";
import {
  getSavedJobs,
  getSavedJobIds,
  saveJob,
  unsaveJob,
} from "../controllers/savedJob.controllers.js";
import authUser from "../middlewares/authUser.js";
import authRecruiter from "../middlewares/authRecruiter.js";

const jobRouter = express.Router();

jobRouter.get("/featured", getFeaturedJobs);
jobRouter.get("/categories", getJobCategories);
jobRouter.get("/saved", authUser, getSavedJobs);
jobRouter.get("/saved/ids", authUser, getSavedJobIds);
jobRouter.post("/save/:id", authUser, saveJob);
jobRouter.delete("/unsave/:id", authUser, unsaveJob);
jobRouter.post("/post", authRecruiter, postJob);
jobRouter.get("/get", getAllJobs);
jobRouter.get("/get/:id", getJobById);
jobRouter.get("/get-recruiter-job", authRecruiter, getRecruiterJobs);
jobRouter.delete("/delete/:id", authRecruiter, deleteJob);

export default jobRouter;
