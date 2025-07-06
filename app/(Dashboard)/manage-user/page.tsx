// @/app/(Dashboard)/manage-user/page.tsx

"use client";

// React
import { useEffect, useState } from "react";

// Components
import { Input } from "@/components/ui/input";
import UserBox from "@/components/ui/UserBox";
import Loading from "@/components/ui/loading";

// Icons
import { Search } from "lucide-react";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// API
import api from "@/lib/axios/axios.client";

// Types
import { IUser } from "@/lib/models/User.model";

const Page = () => {
  const { loading } = useAuth();

  const [data, setData] = useState<IUser[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Fetch users based on search
  useEffect(() => {
    (async () => {
      try {
        let res;

        if (debouncedValue) {
          res = await api.post(`/get-users/${debouncedValue}`);
        } else {
          res = await api.post("/get-users");
        }

        if (res.status === 200) {
          setData(res.data.users);
        }
      } catch {
        console.error("Failed to fetch users");
      }
    })();
  }, [debouncedValue]);

  if (loading) return <Loading />;

  return (
    <>
      {/* Search Bar */}
      <div className="mx-16 mt-14 flex items-center justify-center gap-2 rounded-md border border-black/5 bg-white px-4">
        <Search />
        <Input
          placeholder="Search User"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-12 border-0 bg-white px-6 tracking-wide shadow-none placeholder:text-black/25 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        />
      </div>

      {/* Users Grid */}
      <div className="flex min-h-full flex-wrap items-start justify-start gap-12 p-16">
        {data.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default Page;
