import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { addSavedJobId, removeSavedJobId } from "@/redux/jobSlice";
import { toast } from "sonner";

const SaveJobButton = ({
  jobId,
  variant = "default",
  size = "default",
  className = "",
  showLabel = true,
  iconOnly = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { savedJobIds = [] } = useSelector((store) => store.job);

  const isSaved = savedJobIds?.some((id) => id?.toString() === jobId?.toString());

  const toggleSave = async (e) => {
    e?.stopPropagation?.();

    if (!user) {
      toast.error("Please login to save jobs");
      navigate("/login");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can save jobs");
      return;
    }

    try {
      if (isSaved) {
        const response = await axios.delete(
          `${JOB_API_END_POINT}/unsave/${jobId}`,
          { withCredentials: true },
        );
        if (response.data.success) {
          dispatch(removeSavedJobId(jobId));
          toast.success(response.data.message);
        }
      } else {
        const response = await axios.post(
          `${JOB_API_END_POINT}/save/${jobId}`,
          {},
          { withCredentials: true },
        );
        if (response.data.success) {
          dispatch(addSavedJobId(jobId));
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (iconOnly) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full ${isSaved ? "text-[#002855] border-[#002855]" : ""} ${className}`}
        onClick={toggleSave}
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-[#002855]" : ""}`} />
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`cursor-pointer ${isSaved ? "bg-[#c5a572] hover:bg-[#b39460] text-[#002855]" : "bg-[#002855] hover:bg-[#1a4480]"} ${className}`}
      onClick={toggleSave}
    >
      {showLabel && (isSaved ? "Saved" : "Save")}
      {!showLabel && (
        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
      )}
    </Button>
  );
};

export default SaveJobButton;
