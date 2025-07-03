// @lib/parseJwtExpiry.ts

export function parseJwtExpiry(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 3600;

  const value = parseInt(match[1]);
  const unit = match[2];

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
