// @/hooks/useAuth.ts

"use client";

// React
import { useEffect, useState } from "react";

// Axios
import api from "@/lib/axios/axios.client";

// Router
import { useRouter } from "next/navigation";

// Store
import { useUserStore } from "@/lib/store/useStore";

export function useAuth() {
  // Router
  const router = useRouter();

  // Store
  const { setName } = useUserStore();

  // State
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Function to check auth
    async function checkAuth() {
      try {
        // Make a request to check auth
        const res = await api.get("/auth/validate");

        // If the user is logged in, set the name in the store
        if (res.status === 200) {
          setName(res.data.admin);
        }

        if (res.status === 200) {
          // If authenticated, set loading to false
          setLoading(false);
        } else {
          // If not authenticated, redirect to login
          router.push("/login");
        }
      } catch {
        // If error, redirect to login
        router.push("/login");
      } finally {
        // Set loading to false
        setLoading(false);
      }
    }

    // Check auth on mount
    checkAuth();
  }, []);

  return { loading };
}
