import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#002855] text-white mt-20">
      <div className="container mx-auto px-[5%] lg:px-[10%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-[#c5a572]" />
              <h2 className="text-xl font-bold">
                DBS <span className="text-[#c5a572]">Careers</span>
              </h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Dublin Business School's official job portal connecting students
              and graduates with employers across Ireland.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#c5a572] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/jobs" className="hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">
                  Search Results
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#c5a572] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#c5a572]" />
                13/14 Aungier Street, Dublin 2, D02 WC04
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#c5a572]" />
                careers@dbs.ie
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Dublin Business School — DBS Job Portal
        </div>
      </div>
    </footer>
  );
};

export default Footer;
