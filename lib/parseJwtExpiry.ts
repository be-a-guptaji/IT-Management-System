// @lib/parseJwtExpiry.ts

export function parseJwtExpiry(duration: string): number {
  const match = duration.toLowerCase().match(/^(\d+)([smhd])$/);
  if (!match) {
    console.warn(
      `Invalid JWT duration format: "${duration}". Falling back to 1h.`
    );
    return 3600;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2] as "s" | "m" | "h" | "d";

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return 3600;
  }
}
