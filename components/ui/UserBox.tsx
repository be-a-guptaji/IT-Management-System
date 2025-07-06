// @/components/ui/UserBox.tsx

// React
import React from "react";

// Utility
import Link from "next/link";

// Types
import { IUser } from "@/lib/models/User.model";

// Define props type with `user` of type IUser
type UserBoxProps = {
  user: IUser;
};

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  return (
    <>
      <div className="cursor-pointer rounded-md border border-black/10 bg-white transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95">
        <Link href={`/manage-user/${user.id}`}>
          <div className="size-full w-56 px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="w-1/2 text-lg font-semibold">{`${user.name.firstName} ${user?.name?.middleName} ${user?.name?.lastName}`}</div>
              <div className="rounded-md border border-dashed border-black/35 bg-blue-400/25 p-2 text-lg font-medium text-blue-500">
                Para-{user.para}
              </div>
            </div>
            <div className="text-lg font-semibold">
              <div className="mb-2 text-sm font-medium">Designation:</div>{" "}
              <span className="font-medium">{user.designation}</span>
            </div>
            <div className="text-lg font-semibold">
              <span className="text-sm font-medium">Device Owned</span>: 23
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserBox;
