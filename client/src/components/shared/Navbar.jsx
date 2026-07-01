import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Bookmark,
  BriefcaseBusiness,
  BuildingIcon,
  GraduationCap,
  LogOut,
  MenuIcon,
  SearchCheck,
  User2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetSavedJobs from "@/hooks/useGetSavedJobs";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useGetSavedJobs();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true },
      );
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const resetQuery = () => dispatch(setSearchedQuery(""));

  const navLinkClass =
    "text-sm font-medium text-[#002855]/80 hover:text-[#002855] transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mx-auto h-16 max-sm:px-4 sm:px-[5%] lg:px-[10%]">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <GraduationCap className="h-7 w-7 text-[#002855]" />
          <h1 className="text-xl font-bold text-[#002855]">
            DBS <span className="text-[#c5a572]">Careers</span>
          </h1>
        </button>

        <div className="flex items-center gap-8 max-sm:gap-4">
          <ul className="flex items-center gap-6 max-sm:hidden">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link className={navLinkClass} to="/admin/companies">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link className={navLinkClass} to="/admin/jobs">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className={navLinkClass} to="/" onClick={resetQuery}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className={navLinkClass} to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link className={navLinkClass} to="/saved-jobs">
                    Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className={navLinkClass}
                    to="/browse"
                    onClick={resetQuery}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2 max-sm:hidden">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer border-[#002855]/20">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#002855] hover:bg-[#1a4480] cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#c5a572]/30">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://ui-avatars.com/api/?name=User&background=002855&color=fff"
                    }
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex gap-3 mb-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://ui-avatars.com/api/?name=User&background=002855&color=fff"
                      }
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
                {user?.role === "student" && (
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User2 className="h-4 w-4" />
                    <Link to="/profile">View Profile</Link>
                  </Button>
                )}
                <Button
                  onClick={logoutHandler}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          )}

          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                {user?.role === "recruiter" ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => navigate("/admin/companies")}
                      className="flex items-center gap-3 text-left"
                    >
                      <BuildingIcon className="h-5 w-5" />
                      Companies
                    </button>
                    <button
                      onClick={() => navigate("/admin/jobs")}
                      className="flex items-center gap-3 text-left"
                    >
                      <BriefcaseBusiness className="h-5 w-5" />
                      Jobs
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        navigate("/");
                        resetQuery();
                      }}
                      className="flex items-center gap-3"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => navigate("/jobs")}
                      className="flex items-center gap-3"
                    >
                      <BriefcaseBusiness className="h-5 w-5" />
                      Jobs
                    </button>
                    <button
                      onClick={() => navigate("/saved-jobs")}
                      className="flex items-center gap-3"
                    >
                      <Bookmark className="h-5 w-5" />
                      Saved Jobs
                    </button>
                    <button
                      onClick={() => {
                        navigate("/browse");
                        resetQuery();
                      }}
                      className="flex items-center gap-3"
                    >
                      <SearchCheck className="h-5 w-5" />
                      Browse
                    </button>
                    {!user && (
                      <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                      </>
                    )}
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
