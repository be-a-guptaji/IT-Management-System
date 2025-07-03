// @lib/axios/axios.server.ts

// api
import apiBase from "@/lib/axios/axios.client";

// Server Environment Variables
import { envServer } from "@/lib/env/env.server";

export const api = apiBase.create({
  timeout: envServer.API_TIMEOUT,
});

export default api;
