const BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL_DEV;

// Safety fallback (optional but smart)
export const SAFE_BASE_URL = BASE_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  jobs: `${SAFE_BASE_URL}/jobs.php`,
  career: `${SAFE_BASE_URL}/career.php`,
  contactUs: `${SAFE_BASE_URL}/contactus.php`,
  business: `${SAFE_BASE_URL}/business.php`,
};