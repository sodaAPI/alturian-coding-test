import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your backend URL
  withCredentials: true, // Required for cookies (CSRF token)
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

// Add an interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch CSRF token before making POST/PUT/DELETE requests
axiosInstance.interceptors.request.use(async (config) => {
  if (["post", "put", "delete"].includes(config.method)) {
    try {
      // Fetch the CSRF token from the backend
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }
  return config;
});

export default axiosInstance;
