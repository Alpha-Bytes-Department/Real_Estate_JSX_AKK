import { get } from "react-hook-form";
import { api } from "./apiClient";

// ========================== Profile data update request ==========================
const profileSetting = async (data) => {
  console.log("profileSetting called with:", data);

  let config = {};

  // If data is FormData (image upload)
  if (data instanceof FormData) {
    config.headers = { "Content-Type": "multipart/form-data" };
  }

  const resp = await api.patch("/user/profile/update/", data, config);
  console.log("profileSetting response data:", resp.data);

  
  return resp.data;
};

// ========================== Profile data get request ==========================
const getProfileData = async () => {
  console.log("getProfileData called");
  const resp = await api.get("/user/profile/");
  console.log("getProfileData response data:", resp.data);
  localStorage.setItem("auth_user", JSON.stringify(resp.data));
  return resp.data;
}

// ========================= profile secqurity settings ===========================
const profileSecuritySetting = async (data) => {
  console.log("profileSecuritySetting called with:", data);
  const resp = await api.post("/user/change-password/", data);
  console.log("profileSecuritySetting response data:", resp.data);
  return resp.data;
}

// ========================== Exporting functions ===========================
export { profileSetting, profileSecuritySetting ,getProfileData };