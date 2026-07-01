import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 3,
  storage,
  migrate: (state) =>
    Promise.resolve({
      ...state,
      job: {
        ...state?.job,
        allJobs: state?.job?.allJobs ?? [],
        allAdminJobs: state?.job?.allAdminJobs ?? [],
        allAppliedJobs: state?.job?.allAppliedJobs ?? [],
        savedJobs: state?.job?.savedJobs ?? [],
        savedJobIds: state?.job?.savedJobIds ?? [],
        searchJobByText: state?.job?.searchJobByText ?? "",
        searchedQuery: state?.job?.searchedQuery ?? "",
      },
    }),
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
