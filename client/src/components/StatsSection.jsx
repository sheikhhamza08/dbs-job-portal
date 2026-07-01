import React, { useEffect, useState } from "react";
import axios from "axios";
import { STATS_API_END_POINT } from "@/utils/constant";
import { Briefcase, Building2, GraduationCap, Send } from "lucide-react";
import { motion } from "framer-motion";

const statItems = [
  { key: "totalJobs", label: "Open Roles", icon: Briefcase },
  { key: "totalCompanies", label: "Employers", icon: Building2 },
  { key: "totalStudents", label: "DBS Students", icon: GraduationCap },
  { key: "totalApplications", label: "Applications", icon: Send },
];

const StatsSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(STATS_API_END_POINT);
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <section className="px-[5%] lg:px-[10%] -mt-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statItems.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="glass-card rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#002855]/10 text-[#002855]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-[#002855]">{stats[key] ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
