import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

function LatestJobs() {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-[5%] lg:px-[10%] w-full my-20"
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002855]">
            Latest <span className="text-[#c5a572]">Opportunities</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Fresh roles from top Irish employers
          </p>
        </div>
        <Link to="/jobs" className="max-sm:hidden">
          <Button
            variant="outline"
            className="border-[#002855]/20 text-[#002855] gap-2"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {allJobs?.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No jobs yet — run{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
            npm run seed
          </code>{" "}
          in the server folder.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allJobs?.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default LatestJobs;
