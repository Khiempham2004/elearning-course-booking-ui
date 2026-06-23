const fallbackApiBaseUrl = "https://elearning-course-booking-api-1.onrender.com/api";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl
).replace(/\/+$/, "");

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export const resolveApiAssetUrl = (assetPath) => {
  if (!assetPath) return "";
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  if (assetPath.startsWith("/uploads") || assetPath.startsWith("/images")) {
    return `${API_ORIGIN}${assetPath}`;
  }
  return assetPath;
};
