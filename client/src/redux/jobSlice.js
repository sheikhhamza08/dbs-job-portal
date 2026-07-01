import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
        savedJobIds: [],
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSavedJobs: (state, action) => {
            const jobs = action.payload ?? [];
            state.savedJobs = jobs;
            state.savedJobIds = jobs.map((job) => job._id?.toString());
        },
        setSavedJobIds: (state, action) => {
            state.savedJobIds = action.payload ?? [];
        },
        addSavedJobId: (state, action) => {
            const jobId = action.payload?.toString();
            const ids = state.savedJobIds ?? [];
            if (!ids.some((id) => id?.toString() === jobId)) {
                state.savedJobIds = [...ids, jobId];
            }
        },
        removeSavedJobId: (state, action) => {
            const jobId = action.payload?.toString();
            state.savedJobIds = (state.savedJobIds ?? []).filter(
                (id) => id?.toString() !== jobId,
            );
            state.savedJobs = (state.savedJobs ?? []).filter(
                (job) => job._id?.toString() !== jobId,
            );
        },



    }
});


export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, setSavedJobs, setSavedJobIds, addSavedJobId, removeSavedJobId } = jobSlice.actions;

export default jobSlice.reducer;