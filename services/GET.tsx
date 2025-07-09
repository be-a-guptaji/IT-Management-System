// @/services/GET.tsx

// Axios
import api from "@/lib/axios";

// Function to validate user
export async function validateUser() {
  return await api.get("/auth/validate");
}
