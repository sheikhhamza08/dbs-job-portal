import React, { useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="dbs-hero-pattern text-white px-[5%] lg:px-[10%] pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#c5a572] text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Dublin Business School Careers Portal
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Launch your career
          <span className="block text-[#c5a572]">across Ireland</span>
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
          Discover graduate roles, internships, and employer partnerships curated
          for DBS students — from Dublin to Galway, Cork to Limerick.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden p-2 gap-2">
          <div className="flex items-center flex-1 px-4 gap-3">
            <Search className="h-5 w-5 text-[#002855]/50 shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill, or keyword..."
              className="outline-none w-full text-[#002855] placeholder:text-gray-400 py-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            />
          </div>
          <Button
            onClick={searchJobHandler}
            className="bg-[#002855] hover:bg-[#1a4480] text-white rounded-xl px-8 py-6 cursor-pointer"
          >
            Search Jobs
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-white/70">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> Dublin
          </span>
          <span>•</span>
          <span>Cork</span>
          <span>•</span>
          <span>Galway</span>
          <span>•</span>
          <span>Remote & Hybrid</span>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
