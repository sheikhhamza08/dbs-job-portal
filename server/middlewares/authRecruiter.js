import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authRecruiter = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized — please log in",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;

    const user = await User.findById(req.id);
    if (!user || user.role !== "recruiter") {
      return res.status(403).json({
        message: "Recruiter access only",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default authRecruiter;
