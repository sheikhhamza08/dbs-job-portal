import { setSavedJobIds } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSavedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSavedJobIds = async () => {
      if (!user || user.role !== "student") return;

      try {
        const response = await axios.get(`${JOB_API_END_POINT}/saved/ids`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(
            setSavedJobIds(
              response.data.savedJobIds.map((id) => id.toString()),
            ),
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedJobIds();
  }, [user, dispatch]);
};

export default useGetSavedJobs;
