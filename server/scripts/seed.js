import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

dotenv.config();

const DEMO_PASSWORD = "demo123";

const seedData = {
  users: [
    {
      fullname: "Sarah O'Brien",
      email: "student@dbs.ie",
      phoneNumber: 851234567,
      role: "student",
      profile: {
        bio: "Final-year BSc Computing student at Dublin Business School.",
        skills: ["React", "Node.js", "Python", "SQL"],
        profilePhoto:
          "https://ui-avatars.com/api/?name=Sarah+OBrien&background=002855&color=fff&size=128",
      },
    },
    {
      fullname: "James Murphy",
      email: "student2@dbs.ie",
      phoneNumber: 852345678,
      role: "student",
      profile: {
        bio: "MSc Data Analytics graduate seeking roles in Dublin.",
        skills: ["Python", "Machine Learning", "Tableau", "AWS"],
        profilePhoto:
          "https://ui-avatars.com/api/?name=James+Murphy&background=1a4480&color=fff&size=128",
      },
    },
    {
      fullname: "Emma Walsh",
      email: "recruiter@dbs.ie",
      phoneNumber: 853456789,
      role: "recruiter",
      profile: {
        bio: "Talent partner at DBS Careers & Industry Partnerships.",
        profilePhoto:
          "https://ui-avatars.com/api/?name=Emma+Walsh&background=C5A572&color=002855&size=128",
      },
    },
  ],
  companies: [
    {
      companyName: "Google Ireland",
      description:
        "Google's European headquarters in Dublin, hiring across engineering, sales, and operations.",
      website: "https://www.google.ie",
      location: "Dublin",
      logo: "https://logo.clearbit.com/google.com",
    },
    {
      companyName: "Stripe",
      description:
        "Financial infrastructure for the internet, with a major engineering hub in Dublin.",
      website: "https://stripe.com/ie",
      location: "Dublin",
      logo: "https://logo.clearbit.com/stripe.com",
    },
    {
      companyName: "HubSpot",
      description:
        "CRM and marketing platform with a growing Dublin office supporting EMEA customers.",
      website: "https://www.hubspot.com",
      location: "Dublin",
      logo: "https://logo.clearbit.com/hubspot.com",
    },
    {
      companyName: "DBS Careers Office",
      description:
        "Dublin Business School careers team connecting students with graduate opportunities across Ireland.",
      website: "https://www.dbs.ie",
      location: "Dublin",
      logo: "https://ui-avatars.com/api/?name=DBS&background=002855&color=C5A572&size=128&bold=true",
    },
    {
      companyName: "Accenture Ireland",
      description:
        "Consulting and technology services with graduate programmes in Dublin and Cork.",
      website: "https://www.accenture.com/ie-en",
      location: "Dublin",
      logo: "https://logo.clearbit.com/accenture.com",
    },
    {
      companyName: "Fidelity Investments",
      description:
        "Global financial services firm with technology and operations roles in Dublin and Galway.",
      website: "https://www.fidelity.ie",
      location: "Galway",
      logo: "https://logo.clearbit.com/fidelity.com",
    },
  ],
  jobs: [
    {
      title: "Frontend Developer Graduate",
      description:
        "Join our Dublin team to build customer-facing web applications using React and TypeScript. Ideal for recent DBS computing graduates.",
      requirements: ["React", "JavaScript", "HTML/CSS", "Git"],
      salary: 45,
      experienceLevel: 0,
      location: "Dublin",
      jobType: "Full-time",
      position: 3,
      companyIndex: 0,
    },
    {
      title: "Backend Developer",
      description:
        "Design scalable APIs and microservices for payments infrastructure. Hybrid working available from our Dublin office.",
      requirements: ["Node.js", "PostgreSQL", "REST APIs", "AWS"],
      salary: 65,
      experienceLevel: 2,
      location: "Dublin",
      jobType: "Full-time",
      position: 2,
      companyIndex: 1,
    },
    {
      title: "Full Stack Developer",
      description:
        "Work across the stack on HubSpot's customer platform. Mentorship programme for early-career developers.",
      requirements: ["React", "Java", "SQL", "Agile"],
      salary: 55,
      experienceLevel: 1,
      location: "Dublin",
      jobType: "Full-time",
      position: 4,
      companyIndex: 2,
    },
    {
      title: "Data Scientist",
      description:
        "Analyse student employment trends and build dashboards for DBS career services. Python and ML experience required.",
      requirements: ["Python", "Pandas", "Scikit-learn", "SQL"],
      salary: 48,
      experienceLevel: 1,
      location: "Dublin",
      jobType: "Internship",
      position: 1,
      companyIndex: 3,
    },
    {
      title: "DevOps Engineer",
      description:
        "Support CI/CD pipelines and cloud infrastructure for enterprise clients across Ireland.",
      requirements: ["Docker", "Kubernetes", "Linux", "Terraform"],
      salary: 70,
      experienceLevel: 3,
      location: "Dublin",
      jobType: "Full-time",
      position: 2,
      companyIndex: 4,
    },
    {
      title: "Machine Learning Engineer",
      description:
        "Build ML models for fraud detection and risk analytics in a collaborative Galway team.",
      requirements: ["Python", "TensorFlow", "MLOps", "Statistics"],
      salary: 75,
      experienceLevel: 2,
      location: "Galway",
      jobType: "Full-time",
      position: 1,
      companyIndex: 5,
    },
    {
      title: "Cyber Security Analyst",
      description:
        "Monitor security events and support incident response for a global technology organisation in Dublin.",
      requirements: ["SIEM", "Networking", "Risk Assessment", "ISO 27001"],
      salary: 52,
      experienceLevel: 1,
      location: "Dublin",
      jobType: "Full-time",
      position: 2,
      companyIndex: 4,
    },
    {
      title: "Frontend Developer",
      description:
        "Create polished UI components for Stripe Dashboard. Strong eye for design and accessibility.",
      requirements: ["React", "TypeScript", "CSS", "Accessibility"],
      salary: 62,
      experienceLevel: 2,
      location: "Dublin",
      jobType: "Hybrid",
      position: 3,
      companyIndex: 1,
    },
    {
      title: "Backend Developer",
      description:
        "Graduate programme in Cork — learn enterprise Java development with structured training.",
      requirements: ["Java", "Spring Boot", "SQL", "Problem Solving"],
      salary: 38,
      experienceLevel: 0,
      location: "Cork",
      jobType: "Full-time",
      position: 5,
      companyIndex: 4,
    },
    {
      title: "Graphic Designer",
      description:
        "Design marketing assets and brand campaigns for DBS open days and employer events.",
      requirements: ["Figma", "Adobe Creative Suite", "Brand Design"],
      salary: 35,
      experienceLevel: 1,
      location: "Dublin",
      jobType: "Part-time",
      position: 1,
      companyIndex: 3,
    },
    {
      title: "Full Stack Developer",
      description:
        "Build internal tools for Fidelity's operations team. React and .NET experience valued.",
      requirements: ["React", "C#", ".NET", "Azure"],
      salary: 58,
      experienceLevel: 2,
      location: "Waterford",
      jobType: "Full-time",
      position: 2,
      companyIndex: 5,
    },
    {
      title: "Data Scientist",
      description:
        "Google Ads analytics team — turn large datasets into actionable insights for EMEA advertisers.",
      requirements: ["SQL", "Python", "Statistics", "BigQuery"],
      salary: 80,
      experienceLevel: 3,
      location: "Dublin",
      jobType: "Full-time",
      position: 2,
      companyIndex: 0,
    },
  ],
};

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected for seeding");
};

const seed = async () => {
  await connectDB();

  console.log("Clearing existing data...");
  await Promise.all([
    Application.deleteMany({}),
    Job.deleteMany({}),
    Company.deleteMany({}),
    User.deleteMany({}),
  ]);

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  const users = await User.insertMany(
    seedData.users.map((user) => ({
      ...user,
      password: hashedPassword,
    })),
  );

  const recruiter = users.find((u) => u.role === "recruiter");
  const student = users.find((u) => u.email === "student@dbs.ie");

  const companies = await Company.insertMany(
    seedData.companies.map((company) => ({
      ...company,
      userId: recruiter._id,
    })),
  );

  await User.findByIdAndUpdate(recruiter._id, {
    "profile.company": companies[3]._id,
  });

  const jobs = [];
  for (const jobData of seedData.jobs) {
    const { companyIndex, requirements, ...rest } = jobData;
    const job = await Job.create({
      ...rest,
      requirements,
      company: companies[companyIndex]._id,
      created_by: recruiter._id,
      applications: [],
    });
    jobs.push(job);
  }

  const application = await Application.create({
    job: jobs[0]._id,
    applicant: student._id,
    status: "pending",
  });

  await Job.findByIdAndUpdate(jobs[0]._id, {
    $push: { applications: application._id },
  });

  console.log("\n✅ Demo data seeded successfully!\n");
  console.log("Login credentials:");
  console.log("  Student:   student@dbs.ie  / demo123");
  console.log("  Student 2: student2@dbs.ie / demo123");
  console.log("  Recruiter: recruiter@dbs.ie / demo123");
  console.log(`\n  ${companies.length} companies, ${jobs.length} jobs, 1 sample application\n`);

  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
