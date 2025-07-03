// lib/env.client.ts

// zod
import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

const parsed = publicSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.error(
    "Invalid public environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const envClient = parsed.data;
