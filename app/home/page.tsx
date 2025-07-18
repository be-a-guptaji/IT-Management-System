// @/app/home/page.tsx

"use client";

// React
import { useEffect, useRef, useState, useCallback } from "react";

// Components
import { Input } from "@/components/ui/input";
import UserBox from "@/components/ui/UserBox";
import { Skeleton } from "@/components/ui/skeleton";
import { HomePageLoading } from "@/components/loadings/HomePageLoading";

// Icons
import { Search } from "lucide-react";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// Types
import { UserWithDevices } from "@/lib/types";

// POST Services
import { getSearchedUsers, getUsers } from "@/services/POST";

// Env
import { envClient } from "@/lib/env/env.client";

const Page = () => {
  // Auth hook to show loading UI
  const { loading } = useAuth();

  // State for user data, pagination, loading status, and search
  const [users, setUsers] = useState<UserWithDevices[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // Ref for the "load more" div to observe scroll position
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce search input to avoid excessive requests
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue.trim());
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Reset users and pagination when search term changes
  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedValue]);

  // Fetch users (based on search and pagination)
  const fetchUsers = useCallback(async () => {
    if (!hasMore || isFetching) return;

    setIsFetching(true);

    try {
      // Fetch either searched or paginated users
      const res = debouncedValue
        ? await getSearchedUsers(debouncedValue, page)
        : await getUsers(page);

      if (res.status === 200) {
        const newUsers = res.data.users;

        // Deduplicate users using _id to prevent React key collision
        setUsers((prev) => {
          const existingIds = new Set(prev.map((u) => u._id));
          const filteredNew = newUsers.filter(
            (u: UserWithDevices) => !existingIds.has(u._id)
          );
          return [...prev, ...filteredNew];
        });

        // If fewer users received than page size, we're at the end
        if (newUsers.length < envClient.NEXT_PUBLIC_PAGE_SIZE) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching users", err);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [debouncedValue, page, hasMore, isFetching]);

  // Initial fetch (on mount)
  useEffect(() => {
    if (page === 1 && users.length === 0 && !isFetching) {
      fetchUsers();
    }
  }, [fetchUsers, page, users.length, isFetching]);

  // Infinite scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchUsers();
        }
      },
      { threshold: 1.0 }
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchUsers, hasMore, isFetching]);

  // Show loading UI while auth context is resolving
  if (loading) return <HomePageLoading />;

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
      <div className="flex min-h-full flex-wrap items-start justify-between gap-12 p-16">
        {users.map((user) => (
          <UserBox key={String(user._id)} user={user} />
        ))}

        {/* Infinite Scroll Loader Trigger */}
        {hasMore && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                ref={index === 0 ? loadMoreRef : null}
                key={index}
                className="h-60 w-56 cursor-pointer bg-white"
              />
            ))}
          </>
        )}
      </div>

      {/* End Message */}
      {!hasMore && users.length > 0 && (
        <div className="text-muted-foreground py-6 text-center text-sm tracking-widest">
          No User Left!
        </div>
      )}
    </>
  );
};

export default Page;
