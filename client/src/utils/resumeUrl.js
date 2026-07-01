/**
 * Fix legacy Cloudinary resume URLs (PDFs uploaded under /image/upload/).
 */
export const getResumeUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  if (/\.pdf(\?|#|$)/i.test(url) && url.includes("/image/upload/")) {
    return url.replace("/image/upload/", "/raw/upload/");
  }

  return url;
};
