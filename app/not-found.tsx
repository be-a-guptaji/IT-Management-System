// @/app/not-found.tsx

// Hooks
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/");
}
