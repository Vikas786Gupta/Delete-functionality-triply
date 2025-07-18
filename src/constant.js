export const ENVIRONMENTS = {
  local: "local",
  development: "development",
  staging: "staging",
  production: "production",
};

export const API_BASE_URL = {
  local: "http://www.triplycabs.com:8000",
  localSocket: "http://localhost:4000",
};

export const API_ENDPOINTS = {
  SEND_OTP: "/api/public/auth/send-otp",
  VERIFY_OTP: "/api/public/auth/verify-otp",
  DELETE_USER: "/api/trip/delete-user",
};

export const LOGIN_STEPS = {
  SEND_OTP: "send-otp",
  VERIFY_OTP: "verify-otp",
  SAVE_UIC: "save-UIC",
  UPDATE_USER: "update-user",
};
