import path from "path";
import cloudinary from "./cloudinary.js";

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

export const extractPublicIdFromResumeUrl = (url) => {
  const normalized = normalizeResumeUrl(url);
  const match = normalized.match(/\/upload\/(?:s--[^/]+--\/)?(?:v\d+\/)?(.+?)(?:\?|#|$)/i);

  if (!match?.[1]) return null;

  return decodeURIComponent(match[1]);
};

/**
 * Cloudinary accounts with strict PDF delivery require signed URLs (HTTP 401 otherwise).
 */
export const getSignedResumeUrl = (storedUrl) => {
  if (!storedUrl || typeof storedUrl !== "string") return storedUrl;

  const publicId = extractPublicIdFromResumeUrl(storedUrl);
  if (!publicId) return normalizeResumeUrl(storedUrl);

  return cloudinary.url(publicId, {
    resource_type: "raw",
    type: "upload",
    sign_url: true,
    secure: true,
  });
};

export const uploadResumeToCloudinary = async (cloudinaryClient, fileUri, file) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname?.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    const baseName =
      path.basename(file.originalname, path.extname(file.originalname)) ||
      "resume";
    const safeName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 40);

    return cloudinaryClient.uploader.upload(fileUri.content, {
      resource_type: "raw",
      type: "upload",
      folder: "user-resumes",
      public_id: `${safeName}_${Date.now()}.pdf`,
    });
  }

  return cloudinaryClient.uploader.upload(fileUri.content, {
    resource_type: "auto",
    type: "upload",
    folder: "user-resumes",
  });
};

export const sanitizeUserProfile = (user) => {
  if (!user) return user;

  const plain = user.toObject ? user.toObject() : { ...user };

  if (plain.profile?.resume) {
    plain.profile.resume = getSignedResumeUrl(plain.profile.resume);
  }

  return plain;
};
