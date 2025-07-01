// @lib/enviormentVariables.ts

import { z } from "zod";

// Define a schema for your expected environment
const envSchema = z.object({
  MONGODB_URI: z.string().url(),
  DB_NAME: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  API_TIMEOUT: z.coerce.number(),
});

// Validate process.env
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "Invalid environment variables:",
    result.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const env = result.data;
