import express from "express";
import { getPortalStats } from "../controllers/stats.controllers.js";

const statsRouter = express.Router();

statsRouter.get("/", getPortalStats);

export default statsRouter;
