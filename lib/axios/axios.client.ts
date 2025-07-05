// @lib/axios/axios.client.ts

// Axios
import axios from "axios";

// Client Environment Variables
import { envClient } from "@/lib/env/env.client";

const api = axios.create({
  baseURL: envClient.NEXT_PUBLIC_API_BASE_URL,
});

export default api;
