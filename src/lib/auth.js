import CustomSwal, { showCustomSwal } from "@/components/ui/CustomSwal";
import { api, setAuthHeader, clearAuthHeader, BASE_URL } from "./apiClient";

export const storageKeys = {
  access: "access_token",
  refresh: "refresh_token",
  user: "auth_user",
};

// Helper function to set cookies
function setCookie(name, value, days = 7) {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    // Encode the value to handle special characters
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure=${
      location.protocol === "https:"
    }`;

    // Debug log
    console.log(
      `Setting cookie: ${name} = ${encodedValue.substring(0, 20)}...`
    );
  }
}

// Helper function to remove cookies
function removeCookie(name) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
    console.log(`🗑️ Removing cookie: ${name}`);
  }
}

// ======================== Called when logging in ========================
export function saveAuth({ access, refresh, user }) {
  try {
    console.log("💾 saveAuth called with:", {
      hasAccess: !!access,
      hasRefresh: !!refresh,
      hasUser: !!user,
    });

    // Save to localStorage (for client-side access)
    if (access) localStorage.setItem(storageKeys.access, access);
    if (refresh) localStorage.setItem(storageKeys.refresh, refresh);
    if (user) localStorage.setItem(storageKeys.user, JSON.stringify(user));

    // Save to cookies (for middleware access)
    if (access) setCookie(storageKeys.access, access);
    if (refresh) setCookie(storageKeys.refresh, refresh);
    if (user) setCookie(storageKeys.user, JSON.stringify(user));

    if (access) setAuthHeader(access);

    console.log("✅ Auth data saved successfully");
  } catch (err) {
    console.error("❌ saveAuth error:", err);
  }
}

// ======================== Called when logging out ========================
export function clearAuth() {
  try {
    console.log("Clearing auth data and logging out");

    // Clear from localStorage
    localStorage.removeItem(storageKeys.access);
    localStorage.removeItem(storageKeys.refresh);
    localStorage.removeItem(storageKeys.user);

    // Clear from cookies
    removeCookie(storageKeys.access);
    removeCookie(storageKeys.refresh);
    removeCookie(storageKeys.user);

    clearAuthHeader();
    showCustomSwal({
      icon: "success",
      title: "Logged out successfully",
    });
    window.location.href = "/sign-in"; // Redirect to sign-in page
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
  const resp = await api.post(
    `user/password-reset-confirm/${payload.uid}/${payload.token}/`,
    { password: payload.password, confirm_password: payload.confirm_password }
  );
  console.log("resetPasswordRequest response data:", resp.data);
  return resp.data;
}
