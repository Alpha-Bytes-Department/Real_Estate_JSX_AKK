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
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
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
      if (!refreshToken) {
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        return Promise.reject(error);
      }

      try {
        // Assumption: refresh endpoint is /user/token/refresh/
        const res = await axios.post(
          `${BASE_URL.replace(/\/$/, "")}/user/token/refresh/`,
          { refresh: refreshToken }
        );
        const newAccess = res.data.access || res.data.token || null;
        if (newAccess) {
          localStorage.setItem("access_token", newAccess);
          setAuthHeader(newAccess);
          processQueue(null, newAccess);
          return api(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        // fall through to reject
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export { api, BASE_URL };
