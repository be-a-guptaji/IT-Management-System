// @hooks/useAuth.ts

"use client";

// React
import { useEffect, useState } from "react";

// Axios
import api from "@/lib/axios/axios.client";

// Router
import { useRouter } from "next/navigation";

export function useAuth() {
  // Router
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Function to check auth
    async function checkAuth() {
      try {
        const res = await api.get("/auth");

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
