import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import SaveJobButton from "./SaveJobButton";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdAt.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.floor(differenceInDays);
  };

  return (
    <div className="p-5 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <SaveJobButton jobId={job._id} iconOnly />
      </div>

      <div className="flex gap-3 items-center my-3">
        <Avatar className="h-12 w-12 rounded-xl">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://ui-avatars.com/api/?name=Co&background=002855&color=fff"
            }
          />
        </Avatar>
        <div>
          <h2 className="font-semibold text-[#002855]">
            {job?.company?.companyName}
          </h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job?.location}
          </p>
        </div>
      </div>

      <h3 className="font-bold text-lg mb-1">{job?.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
        {job?.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-[#002855]/5 text-[#002855]" variant="secondary">
          {job?.position} positions
        </Badge>
        <Badge className="bg-orange-50 text-orange-700" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#c5a572]/15 text-[#8a6d3b]" variant="secondary">
          €{job?.salary}k
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button
          className="cursor-pointer flex-1 border-[#002855]/20 text-[#002855]"
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <SaveJobButton jobId={job._id} className="flex-1" />
      </div>
    </div>
  );
};

export default Job;
