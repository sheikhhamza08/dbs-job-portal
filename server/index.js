import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import companyRouter from "./routes/company.routes.js";
import applicantionRouter from "./routes/application.routes.js";
import statsRouter from "./routes/stats.routes.js";
dotenv.config({});

const app = express();

connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    message: "DBS Job Portal API",
    version: "1.0.0",
    docs: "/api/v1",
  });
});

app.get("/api/v1", (req, res) => {
  res.json({
    endpoints: {
      user: "/api/v1/user",
      job: "/api/v1/job",
      company: "/api/v1/company",
      application: "/api/v1/application",
      stats: "/api/v1/stats",
    },
  });
});

const PORT = process.env.PORT;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/application", applicantionRouter);
app.use("/api/v1/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
