import { api, setAuthHeader, clearAuthHeader, BASE_URL } from "./apiClient";

export const storageKeys = {
  access: "access_token",
  refresh: "refresh_token",
  user: "auth_user",
};


// ======================== Called when logging in ========================
export function saveAuth({ access, refresh, user }) {
  try {
    if (access) localStorage.setItem(storageKeys.access, access);
    if (refresh) localStorage.setItem(storageKeys.refresh, refresh);
    if (user) localStorage.setItem(storageKeys.user, JSON.stringify(user));
    if (access) setAuthHeader(access);
  } catch (err) {
    console.error("saveAuth error:", err);
  }
}


// ======================== Called when logging out ========================
export function clearAuth() {
  try {
    localStorage.removeItem(storageKeys.access);
    localStorage.removeItem(storageKeys.refresh);
    localStorage.removeItem(storageKeys.user);
    clearAuthHeader();
    
  } catch (err) {
    console.error("clearAuth error:", err);
  }
}

// ======================== API Requests ========================

// ======================== Request for Login ========================
export async function loginRequest({ email, password }) {
  console.log("loginRequest called with:", { email, password });
  const resp = await api.post("/user/login/", { email, password });
  console.log("loginRequest response data:", resp.data);
  return resp.data;
}

// ======================== Request for Signup ========================
export async function signupRequest(payload) {
  console.log("signupRequest called with:", payload);
  const resp = await api.post("/user/signup/", payload);
  console.log("signupRequest response data:", resp.data);
  return resp.data;
}

// ======================== Request for forgot password ========================
export async function forgotPasswordRequest(payload) {
  console.log("forgotPasswordRequest called with:", payload);
  const resp = await api.post("user/password-reset/", payload);
  console.log("forgotPasswordRequest response data:", resp.data);
  return resp.data;
}

// ======================== Request for reset password ========================
export async function resetPasswordRequest(payload) {
  console.log("resetPasswordRequest called with:", payload);
  const resp = await api.post(`user/password-reset-confirm/${payload.uid}/${payload.token}/`, {password: payload.password, confirm_password: payload.confirm_password});
  console.log("resetPasswordRequest response data:", resp.data);
  return resp.data;
}