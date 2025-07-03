// @components/ui/loading.tsx

// Icons
import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center gap-6 p-16">
        <Loader2 className="size-8 animate-spin text-gray-500" />
        <h1 className="text-lg font-medium text-gray-700">Verifying...</h1>
      </div>
    </>
  );
};

export default loading;
