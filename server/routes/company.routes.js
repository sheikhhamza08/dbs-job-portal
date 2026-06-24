import express from "express";
import {
  registerCompany,
} from "../controllers/company.controllers.js";
import authUser from "../middlewares/authUser.js";
import { singleUpload } from "../middlewares/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register", authUser, registerCompany);

export default companyRouter;
