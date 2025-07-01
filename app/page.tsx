// @app/page.tsx

"use client";

// Components
import { LoginForm } from "@/components/form/LoginForm";
import { SignUpForm } from "@/components/form/SignUpForm";
import { Button } from "@/components/ui/button";

// Utility
import { cn } from "@/lib/utils";

// React
import { useState } from "react";

export default function page() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div>Login page</div>
    </>
  );
}
