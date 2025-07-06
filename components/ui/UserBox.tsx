// @/components/ui/UserBox.tsx

// React
import React from "react";

// Utility
import Link from "next/link";

// Types
import { UserBoxProps } from "@/lib/types";

const UserBox = ({ id }: UserBoxProps) => {
  return (
    <>
      <div className="cursor-pointer rounded-md border border-black/10 bg-white transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95">
        <Link href={`/manage-user/${id}`}>
          <div className="size-full w-56 px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="w-1/2 text-lg font-semibold">User Name</div>
              <div className="rounded-md border border-dashed border-black/35 bg-blue-400/25 p-2 text-lg font-medium text-blue-500">
                Para-{id}
              </div>
            </div>
            <div className="text-lg font-semibold">
              <span className="text-sm font-medium">Designation:</span>{" "}
              Scientist
            </div>
            <div className="text-lg font-semibold">
              <span className="text-sm font-medium">Device Owned</span>: 33
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserBox;
