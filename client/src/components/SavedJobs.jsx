import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/jobSlice";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";

const SavedJobs = () => {
  useGetSavedJobs();
  const dispatch = useDispatch();
  const { savedJobs = [] } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user || user.role !== "student") return;

      try {
        const response = await axios.get(`${JOB_API_END_POINT}/saved`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setSavedJobs(response.data.jobs ?? []));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedJobs();
  }, [user, dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] px-[5%] lg:px-[10%] py-10 bg-[#f8fafc]">
        <div className="flex items-center gap-3 mb-2">
          <Bookmark className="h-7 w-7 text-[#002855]" />
          <h1 className="text-3xl font-bold text-[#002855]">Saved Jobs</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Jobs you've bookmarked to review later
        </p>

        {savedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border">
            <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No saved jobs yet</p>
            <Link to="/jobs">
              <Button variant="outline" className="border-[#002855]/20 text-[#002855]">
                Browse Jobs
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SavedJobs;
