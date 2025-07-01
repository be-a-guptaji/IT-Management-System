// @lib/axios.ts

// Axios
import axios from "axios";

// Environment
import { env } from "@/lib/enviormentVariables";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
