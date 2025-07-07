// lib/env.client.ts

// Zod
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
  throw new Error(
    "Invalid public environment variables:\n" +
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
  );
}

export const envClient = parsed.data;
