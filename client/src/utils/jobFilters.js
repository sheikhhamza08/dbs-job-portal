export const JOB_FILTER_OPTIONS = [
  {
    filterType: "Location",
    array: ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Kilkenny"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "Machine Learning",
      "DevOps Engineer",
      "Cyber Security",
      "Graphic Designer",
    ],
  },
  {
    filterType: "Salary",
    array: ["€30k-€50k", "€50k-€70k", "€70k-€100k", "€100k+"],
  },
];

const SALARY_RANGES = {
  "€30k-€50k": { min: 30, max: 50 },
  "€50k-€70k": { min: 50, max: 70 },
  "€70k-€100k": { min: 70, max: 100 },
  "€100k+": { min: 100, max: Infinity },
};

const LOCATIONS = new Set(JOB_FILTER_OPTIONS[0].array);
const INDUSTRIES = new Set(JOB_FILTER_OPTIONS[1].array);
const SALARIES = new Set(JOB_FILTER_OPTIONS[2].array);

const matchesSalaryRange = (salary, rangeLabel) => {
  const amount = Number(salary);
  if (Number.isNaN(amount)) return false;

  const range = SALARY_RANGES[rangeLabel];
  if (!range) return false;

  if (rangeLabel === "€100k+") {
    return amount >= range.min;
  }

  return amount >= range.min && amount <= range.max;
};

export const filterJobsByQuery = (jobs, query) => {
  const safeJobs = jobs ?? [];
  if (!query?.trim()) return safeJobs;

  const selected = query.trim();

  return safeJobs.filter((job) => {
    if (LOCATIONS.has(selected)) {
      return job?.location?.toLowerCase().includes(selected.toLowerCase());
    }

    if (INDUSTRIES.has(selected)) {
      return job?.title?.toLowerCase().includes(selected.toLowerCase());
    }

    if (SALARIES.has(selected)) {
      return matchesSalaryRange(job?.salary, selected);
    }

    const keyword = selected.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(keyword) ||
      job?.description?.toLowerCase().includes(keyword) ||
      job?.location?.toLowerCase().includes(keyword)
    );
  });
};
