import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { getSignedResumeUrl } from "../utils/resumeUrl.js";

const sanitizeJobApplicants = (job) => {
  if (!job?.applications) return job;

  const plain = job.toObject ? job.toObject() : { ...job };

  plain.applications = plain.applications.map((application) => {
    if (application?.applicant?.profile?.resume) {
      application.applicant.profile.resume = getSignedResumeUrl(
        application.applicant.profile.resume,
      );
    }
    return application;
  });

  return plain;
};

// for role === "student"
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    // check if user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for role === "student"
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    const validApplications = application.filter((app) => app.job !== null);

    return res.status(200).json({
      applications: validApplications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// role === "recruiter"
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job: sanitizeJobApplicants(job),
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// role === "recruiter"
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "Status is required",
        success: false,
      });
    }

    const application = await Application.findByIdAndUpdate(applicationId, {
      status: status.toLowerCase(),
    });
    return res.status(200).json({
      message: "Status updated successfully",

      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
