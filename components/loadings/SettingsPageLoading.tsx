// @/components/loadings/SettingsPageLoading.tsx

// Components
import { Skeleton } from "@/components/ui/skeleton";

export const SettingsPageLoading = () => {
  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-start gap-10 px-6 py-16">
        <Skeleton className="flex h-14 w-full max-w-4xl cursor-pointer items-center justify-between bg-white px-8 text-lg font-medium transition-all hover:scale-105 hover:shadow-md active:scale-95" />
        <Skeleton className="flex h-14 w-full max-w-4xl cursor-pointer items-center justify-between bg-white px-8 text-lg font-medium transition-all hover:scale-105 hover:shadow-md active:scale-95" />
      </div>
    </>
  );
};
