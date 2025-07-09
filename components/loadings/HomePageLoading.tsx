// @/components/loadings/HomePageLoading.tsx

// Components
import { Skeleton } from "@/components/ui/skeleton";

export const HomePageLoading = () => {
  return (
    <>
      <div className="mx-16 mt-14 flex items-center justify-center gap-2 rounded-md border border-black/5 bg-white px-4">
        <Skeleton className="h-12 border-0 bg-white" />
      </div>

      {/* Users Grid */}
      <div className="flex min-h-full flex-wrap items-start justify-start gap-12 p-16">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="h-60 w-56 cursor-pointer bg-white" />
        ))}
      </div>
    </>
  );
};
