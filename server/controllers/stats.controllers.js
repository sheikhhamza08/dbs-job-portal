import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";

export const getPortalStats = async (req, res) => {
  try {
    const [totalJobs, totalCompanies, totalStudents, totalApplications] =
      await Promise.all([
        Job.countDocuments(),
        Company.countDocuments(),
        User.countDocuments({ role: "student" }),
        Application.countDocuments(),
      ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        totalCompanies,
        totalStudents,
        totalApplications,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to load portal stats",
      success: false,
    });
  }
};
