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
      <div className="flex h-screen w-screen justify-center bg-[linear-gradient(135deg,_#0466c8,_#0353a4,_#023e7d,_#002855,_#001845,_#001233)] py-16">
        <div className="w-[40rem] rounded-lg border border-white bg-[#343a40] p-8">
          <div className="mb-12 flex items-center justify-center gap-4">
            <Button
              className={cn(
                "h-12 w-1/2 cursor-pointer",
                isLogin && "bg-blue-500 hover:bg-blue-500 active:bg-blue-500"
              )}
              onClick={() => setIsLogin(true)}
            >
              <h1 className="text-center text-3xl font-semibold">Login</h1>
            </Button>
            <Button
              className={cn(
                "h-12 w-1/2 cursor-pointer",
                !isLogin && "bg-blue-500 hover:bg-blue-500 active:bg-blue-500"
              )}
              onClick={() => setIsLogin(false)}
            >
              <h1 className="text-center text-3xl font-semibold">Sign Up</h1>
            </Button>
          </div>
          <div>
            {isLogin && <LoginForm />}
            {!isLogin && <SignUpForm />}
          </div>
        </div>
      </div>
    </>
  );
}
