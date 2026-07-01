/**
 * PDFs must use Cloudinary "raw" delivery. Uploads saved under /image/upload/
 * break in the browser PDF viewer ("Failed to load PDF document").
 */
export const normalizeResumeUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  if (/\.pdf(\?|#|$)/i.test(url) && url.includes("/image/upload/")) {
    return url.replace("/image/upload/", "/raw/upload/");
  }

  return url;
};

export const uploadResumeToCloudinary = async (cloudinary, fileUri, file) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname?.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    return cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
      folder: "user-resumes",
      use_filename: true,
      unique_filename: true,
      access_mode: "public",
    });
  }

  return cloudinary.uploader.upload(fileUri.content, {
    resource_type: "auto",
    folder: "user-resumes",
    access_mode: "public",
  });
};

export const sanitizeUserProfile = (user) => {
  if (!user) return user;

  const plain = user.toObject ? user.toObject() : { ...user };

  if (plain.profile?.resume) {
    plain.profile.resume = normalizeResumeUrl(plain.profile.resume);
  }

  return plain;
};
