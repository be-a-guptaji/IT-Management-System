// @app/(Dashboard)/manage-user/Page.tsx

"use client";

// Components
import { Input } from "@/components/ui/input";
import UserBox from "@/components/ui/UserBox";
import Loading from "@/components/ui/loading";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// Icons
import { Search } from "lucide-react";

const Page = () => {
  // Hooks to check auth
  const { loading } = useAuth();

  // If loading, show loading message
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-full flex-wrap items-center justify-center gap-12 p-16">
        <div className="mx-8 flex w-full items-center justify-center gap-2 rounded-md border border-black/5 bg-white px-4">
          <Search />
          <Input
            placeholder="Search User"
            className="h-12 border-0 bg-white px-6 tracking-wide shadow-none placeholder:text-black/25 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          />
        </div>
        {Array.from({ length: 127 }, (_, i) => (
          <UserBox id={(i + 1).toString()} key={(i + 1).toString()} />
        ))}
      </div>
    </>
  );
};

export default Page;
