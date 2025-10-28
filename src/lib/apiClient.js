import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://10.10.12.51:4000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthHeader(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export function clearAuthHeader() {
  delete api.defaults.headers.common["Authorization"];
}

// =============================Attach access token from localStorage to every request if available ============================
api.interceptors.request.use((config) => {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (token && !config.headers?.Authorization) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // noop
  }
  return config;
});

// Response interceptor: try refresh once on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("=============Response interceptor triggered=================");
    console.log("Error status:", error.response?.status);
    console.log("Original request URL:", originalRequest?.url);
    console.log("Original request _retry:", originalRequest?._retry);

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log(
        "=============401 detected, attempting token refresh================="
      );

      if (isRefreshing) {
        console.log(
          "=============Already refreshing, queuing request================="
        );
        // queue the request until refresh finishes
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh_token")
          : null;

      console.log(
        "=============Refresh token from localStorage=================:",
        refreshToken ? "Present" : "Not found"
      );

      if (!refreshToken) {
        console.log(
          "=============No refresh token found, redirecting to sign-in================="
        );
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        // Clear tokens and redirect
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          clearAuthHeader();
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }

      try {
        // Use the correct refresh endpoint
        console.log("=============Attempting token refresh=================");
        const res = await axios.post(
          "http://10.10.12.51:4000/api/token/refresh/",
          { refresh: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(
          "=============Refresh response=================:",
          res.data
        );
        const newAccess = res.data.access || res.data.token || null;
        const newRefresh = res.data.refresh || null;

        if (newAccess) {
          console.log("=============Token refresh successful=================");
          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", newAccess);
            // Also update refresh token if provided
            if (newRefresh) {
              localStorage.setItem("refresh_token", newRefresh);
            }
          }
          setAuthHeader(newAccess);
          processQueue(null, newAccess);
          return api(originalRequest);
        } else {
          console.log(
            "=============Token refresh failed - no new access token================="
          );
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            clearAuthHeader();
            window.location.href = "/sign-in";
          }
          processQueue(new Error("No new access token"), null);
        }
      } catch (err) {
        console.log(
          "=============Token refresh error=================:",
          err.response?.data || err.message
        );
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          clearAuthHeader();
          window.location.href = "/sign-in";
        }
        processQueue(err, null);
        // fall through to reject
      } finally {
        isRefreshing = false;
      }
    }

    console.log("=============Rejecting original error=================");
    return Promise.reject(error);
  }
);

export { api, BASE_URL };
