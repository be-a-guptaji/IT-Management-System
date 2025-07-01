// @components/search/Index.tsx

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

// Utility
import { useState } from "react";

const AllPCsSection = () => {
  // State to handle the opening and closing of the modal
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-full w-full">
        <div className="mb-8 flex w-full items-center justify-between gap-12 rounded-lg">
          <div className="flex w-full items-center justify-between p-2">
            <Button className="flex h-12 w-[calc(100%-4rem)] cursor-text items-center justify-start bg-zinc-400/75 dark:bg-zinc-900 dark:text-white">
              <Search className="mr-4 ml-8 h-5 w-5" />
              <span className="ml-2">Search PCs</span>
            </Button>
            <Button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-lg bg-red-500 hover:bg-red-600 active:bg-red-700">
              <X className="h-5 w-5 text-white" />
            </Button>
          </div>
          <Select>
            <SelectTrigger className="!h-12 w-48 cursor-pointer bg-zinc-400/75 dark:bg-zinc-900 dark:hover:bg-zinc-900">
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

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search all channels and members" />
          <CommandList className="py-2">
            <CommandEmpty>No results found.</CommandEmpty>
            {/* {data.map(({ label, type, data }) => {
                  if (!data?.length) return null;
  
                  return (
                    <CommandGroup key={label} heading={label}>
                      {data?.map(({ id, name, icon }) => {
                        return (
                          <CommandItem
                            className={cn(
                              "my-1",
                              (params?.channelID === id &&
                                "bg-zinc-700/20 dark:bg-zinc-700/60") ||
                                (params?.memberID === id &&
                                  "bg-zinc-700/20 dark:bg-zinc-700/60")
                            )}
                            key={id}
                            onSelect={() => onClick({ id, type })}
                          >
                            {icon}
                            <span>{name}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  );
                })} */}
          </CommandList>
        </CommandDialog>
      </div>
    </>
  );
};

export default AllPCsSection;
