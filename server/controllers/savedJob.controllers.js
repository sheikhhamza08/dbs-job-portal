import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";

const ensureStudent = async (userId, res) => {
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found", success: false });
    return null;
  }
  if (user.role !== "student") {
    res.status(403).json({
      message: "Only students can save jobs",
      success: false,
    });
    return null;
  }
  return user;
};

export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    const user = await ensureStudent(userId, res);
    if (!user) return;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const alreadySaved = user.savedJobs.some(
      (id) => id.toString() === jobId.toString(),
    );

    if (alreadySaved) {
      return res.status(400).json({
        message: "Job already saved",
        success: false,
      });
    }

    user.savedJobs.push(jobId);
    await user.save();

    return res.status(200).json({
      message: "Job saved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to save job",
      success: false,
    });
  }
};

export const unsaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await ensureStudent(userId, res);
    if (!user) return;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedJobs: jobId },
    });

    return res.status(200).json({
      message: "Job removed from saved list",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to unsave job",
      success: false,
    });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await ensureStudent(userId, res);
    if (!user) return;

    const populated = await User.findById(userId).populate({
      path: "savedJobs",
      populate: { path: "company" },
    });

    const jobs = (populated?.savedJobs || []).filter((job) => job !== null);

    return res.status(200).json({
      jobs,
      savedJobIds: jobs.map((job) => job._id),
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to load saved jobs",
      success: false,
    });
  }
};

export const getSavedJobIds = async (req, res) => {
  try {
    const userId = req.id;

    const user = await ensureStudent(userId, res);
    if (!user) return;

    return res.status(200).json({
      savedJobIds: user.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to load saved job ids",
      success: false,
    });
  }
};
