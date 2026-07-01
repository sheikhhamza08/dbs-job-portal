import path from "path";

/**
 * PDFs must use Cloudinary "raw" delivery, not /image/upload/.
 */
export const normalizeResumeUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  let fixed = url;

  // Remove fl_inline / fl_attachment — they return HTTP 400 on raw PDFs
  fixed = fixed.replace(/\/fl_(inline|attachment):[^/]+\//, "/");

  if (fixed.includes("/image/upload/")) {
    fixed = fixed.replace("/image/upload/", "/raw/upload/");
  }

  const pathWithoutQuery = fixed.split("?")[0];

  // Legacy raw uploads saved without a .pdf suffix
  if (
    fixed.includes("/raw/upload/") &&
    !/\.pdf(\?|#|$)/i.test(pathWithoutQuery)
  ) {
    fixed = `${fixed}.pdf`;
  }

  return fixed;
};

export const uploadResumeToCloudinary = async (cloudinary, fileUri, file) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname?.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    const baseName =
      path.basename(file.originalname, path.extname(file.originalname)) ||
      "resume";
    const safeName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 40);

    return cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
      folder: "user-resumes",
      public_id: `${safeName}_${Date.now()}.pdf`,
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
