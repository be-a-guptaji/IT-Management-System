// @/app/(Dashboard)/settings/Page.tsx

"use client";

// Components
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

// Hooks
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight } from "lucide-react";

const Page = () => {
  // Hooks to check auth
  const { loading } = useAuth();

  // If loading, show loading message
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-full flex-col flex-wrap items-center justify-start gap-4 p-16">
        <Button
          variant="outline"
          className="flex h-14 w-full max-w-4xl cursor-pointer items-center justify-between px-8 font-medium hover:scale-105 hover:shadow-md active:scale-95"
        >
          Change User Name
          <ArrowRight />
        </Button>

        <Button
          variant="outline"
          className="flex h-14 w-full max-w-4xl cursor-pointer items-center justify-between px-8 font-medium hover:scale-105 hover:shadow-md active:scale-95"
        >
          Change Password
          <ArrowRight />
        </Button>
      </div>
    </>
  );
};

export default Page;
