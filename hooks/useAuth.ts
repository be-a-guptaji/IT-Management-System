// @/hooks/useAuth.ts

"use client";

// React
import { useEffect, useState } from "react";

// Utility
import { useRouter } from "next/navigation";

// Store
import { useUserStore } from "@/lib/store/useStore";

// GET Services
import { validateUser } from "@/services/GET";

export function useAuth() {
  // Router
  const router = useRouter();

  // Store
  const { setName } = useUserStore();

  // State
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Check if user is already logged in
    (async () => {
      try {
        // Make a request to check if the user is already logged in
        const res = await validateUser();

        // If the user is logged in, set the name in the store
        if (res.status === 200) {
          setName(res.data.admin);
        } else {
          // If the user is not logged in, redirect to login
          router.push("/");
        }
      } catch {
        // If error, redirect to login
        router.push("/");
      } finally {
        // Set Loading to false
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
}
