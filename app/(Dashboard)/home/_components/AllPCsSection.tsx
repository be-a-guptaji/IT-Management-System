// @app/(Dashboard)/home/_components/AllPCsSection.tsx

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "@/components/search/Index";

const AllPCsSection = () => {
  return (
    <>
      <SearchBar />
      <div className="grid h-full w-full grid-cols-4 gap-12">
        <div className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mx-auto flex h-48 w-48 shrink-0 cursor-pointer flex-col items-center justify-center gap-0 rounded-xl border border-white/30 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-black shadow-lg backdrop-blur-md transition-all duration-300 outline-none hover:scale-105 hover:bg-white hover:shadow-2xl focus-visible:ring-[3px] active:scale-95 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 dark:bg-white/10 dark:hover:bg-white/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <div className="mb-2 flex h-full w-full flex-col items-center justify-center">
            <div className="mb-4 flex w-full gap-4">
              <div className="flex flex-col overflow-hidden">
                <div className="text-sm">Device Name</div>
                <div className="text-sm">User Name</div>
              </div>
              <div className="flex items-center justify-center rounded-xl border border-black/20 px-3 text-sm dark:border-white/30">
                Para 19
              </div>
            </div>

            <div className="text-lg font-bold">23:23:34:34:65:12</div>
            <div className="text-lg font-bold">23:23:34:34:65:12</div>
          </div>
          {/* <div className="flex w-full items-center justify-center gap-2">
            <Button className="w-1/2 cursor-pointer bg-sky-300 text-sky-700 hover:bg-sky-400 active:bg-sky-500">
              Edit
            </Button>
            <Button className="w-1/2 cursor-pointer bg-red-300 text-red-700 hover:bg-red-400 active:bg-red-500">
              Delete
            </Button>
          </div> */}
          <Select>
            <SelectTrigger className="!h-12 w-full cursor-pointer bg-zinc-400/75 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-900">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light" className="cursor-pointer">
                Light
              </SelectItem>
              <SelectItem value="dark" className="cursor-pointer">
                Dark
              </SelectItem>
              <SelectItem value="system" className="cursor-pointer">
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default AllPCsSection;
