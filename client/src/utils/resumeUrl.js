/**
 * Normalize Cloudinary resume URLs for raw PDF delivery.
 */
export const getResumeUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  let fixed = url;

  fixed = fixed.replace(/\/fl_(inline|attachment):[^/]+\//, "/");

  if (fixed.includes("/image/upload/")) {
    fixed = fixed.replace("/image/upload/", "/raw/upload/");
  }

  const pathWithoutQuery = fixed.split("?")[0];

  if (
    fixed.includes("/raw/upload/") &&
    !/\.pdf(\?|#|$)/i.test(pathWithoutQuery)
  ) {
    fixed = `${fixed}.pdf`;
  }

  return fixed;
};
