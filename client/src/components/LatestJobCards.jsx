import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import SaveJobButton from "./SaveJobButton";

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
    >
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <SaveJobButton jobId={job._id} iconOnly />
      </div>
      <div className="flex items-center gap-3 mb-4">
        <img
          src={
            job?.company?.logo ||
            "https://ui-avatars.com/api/?name=Co&background=002855&color=fff"
          }
          alt={job?.company?.companyName}
          className="h-10 w-10 rounded-lg object-contain bg-gray-50 p-1"
        />
        <div>
          <h3 className="font-semibold text-[#002855] group-hover:text-[#1a4480]">
            {job?.company?.companyName}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job?.location}
          </p>
        </div>
      </div>

      <h4 className="font-bold text-lg mb-2">{job?.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {job?.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="secondary"
          className="bg-[#002855]/5 text-[#002855] font-medium"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-[#c5a572]/15 text-[#8a6d3b] font-medium"
        >
          €{job?.salary}k
        </Badge>
        <Badge variant="outline">{job?.position} open</Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
