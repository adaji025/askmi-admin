import { clearAuthSessionCookie } from "@/lib/auth-session-cookie";
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const PERSIST_KEY = "askmi_admin";

// Helper function to get token from localStorage
const getTokenFromStorage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedData = localStorage.getItem(PERSIST_KEY);
    if (!storedData) {
      return null;
    }

    const parsed = JSON.parse(storedData);
    // Zustand persist stores data in { state: { ... }, version: ... } format
    const token = parsed?.state?.token;
    
    if (!token) {
      console.warn("Token not found in localStorage. Structure:", parsed);
      return null;
    }

    return token;
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return null;
  }
};

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromStorage();
    
    if (token) {
      // Ensure headers object exists
      if (!config.headers) {
        config.headers = {} as any;
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token available for request to:", config.url);
      console.warn("Please make sure you are logged in.");
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      // Handle 401 Unauthorized - clear token and redirect to login
      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(PERSIST_KEY);
          clearAuthSessionCookie();
          window.location.href = "/auth/sign-in";
        }
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.error("Access forbidden");
      }
      
      // Handle 500 Internal Server Error
      if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
