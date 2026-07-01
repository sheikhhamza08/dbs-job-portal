import { USER_API_END_POINT } from "@/utils/constant";

/**
 * Open resume via authenticated API route (redirects to signed Cloudinary URL).
 */
export const getResumeDownloadUrl = (userId) => {
  if (!userId) return null;
  return `${USER_API_END_POINT}/resume/${userId}`;
};

/**
 * @deprecated Prefer getResumeDownloadUrl — direct Cloudinary links may return HTTP 401.
 */
export const getResumeUrl = (url) => url;
