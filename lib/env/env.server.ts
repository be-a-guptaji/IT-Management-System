// lib/env.server.ts

// zod
import { z } from "zod";

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().url(),
  DB_NAME: z.string(),
  SALT_ROUNDS: z.coerce.number(),
  API_TIMEOUT: z.coerce.number(),
});

const parsed = serverEnvSchema.safeParse({
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  API_TIMEOUT: process.env.API_TIMEOUT,
});

if (!parsed.success) {
  console.error(
    "Invalid server environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const envServer = parsed.data;
