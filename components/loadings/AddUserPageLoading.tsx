// @/components/loadings/AddUserPageLoading.tsx

// Components
import { Skeleton } from "@/components/ui/skeleton";

export const AddUserPageLoading = () => {
  return (
    <>
      <div className="flex min-h-full flex-wrap items-center justify-center gap-12 p-16">
        <Skeleton className="h-[551.6px] w-[680px] cursor-pointer bg-white" />
      </div>
    </>
  );
};
