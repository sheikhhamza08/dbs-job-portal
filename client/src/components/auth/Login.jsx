import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { GraduationCap, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate(response.data.user.role === "recruiter" ? "/admin/companies" : "/");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
          <div className="dbs-gradient p-10 text-white hidden md:flex flex-col justify-center">
            <GraduationCap className="h-12 w-12 text-[#c5a572] mb-6" />
            <h2 className="text-3xl font-bold mb-4">Welcome back</h2>
            <p className="text-white/80 leading-relaxed">
              Sign in to your DBS Careers account to apply for roles, track
              applications, and connect with Irish employers.
            </p>
            <div className="mt-8 p-4 rounded-xl bg-white/10 text-sm">
              <p className="font-medium text-[#c5a572] mb-1">Demo accounts</p>
              <p>student@dbs.ie / demo123</p>
              <p>recruiter@dbs.ie / demo123</p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="bg-white p-8 sm:p-10">
            <h1 className="font-bold text-2xl text-[#002855] mb-6">Sign in</h1>

            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="student@dbs.ie"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="mb-2 block">I am a</Label>
                <div className="flex gap-4">
                  {["student", "recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex-1 text-center py-2 px-4 rounded-lg border cursor-pointer capitalize transition-colors ${
                        input.role === role
                          ? "bg-[#002855] text-white border-[#002855]"
                          : "border-gray-200 hover:border-[#002855]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={input.role === role}
                        onChange={changeEventHandler}
                        className="sr-only"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <Button disabled className="w-full mt-6 bg-[#002855]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-6 bg-[#002855] hover:bg-[#1a4480] cursor-pointer">
                Sign in
              </Button>
            )}

            <p className="text-sm text-center mt-6 text-muted-foreground">
              No account?{" "}
              <Link to="/signup" className="text-[#002855] font-medium hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
