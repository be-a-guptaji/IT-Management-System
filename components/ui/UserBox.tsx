// @/components/ui/UserBox.tsx

// Types
import { UserWithDevices } from "@/lib/types";

// Utility
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";

const UserBox: React.FC<{ user: UserWithDevices }> = ({ user }) => {
  // Router
  const router = useRouter();

  // Function to handle click
  const handleClick = () => {
    router.push(`/manage-user/${user._id}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="flex h-60 w-56 cursor-pointer flex-col gap-0 rounded-md border border-black/10 bg-white p-0 py-4 text-left transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <div className="mb-4 flex w-full items-center justify-between px-4">
        <div className="flex w-1/2 flex-col items-start text-lg font-semibold text-blue-800">
          <span>{user.name.firstName}</span>
          {user.name.middleName && <span>{user.name.middleName}</span>}
          {user.name.lastName && <span>{user.name.lastName}</span>}
        </div>
        <div className="scale-110 rounded-md border border-black/5 bg-blue-400/25 p-2 text-lg font-medium text-blue-500">
          Para-{user.para}
        </div>
      </div>

      <div className="mb-4 px-4 text-left text-lg font-semibold text-wrap">
        <span className="text-sm font-medium">Designation:</span>{" "}
        {user.designation}
      </div>

      <div className="mb-4 text-lg font-semibold">
        <span className="text-sm font-medium">Device Owned:</span>{" "}
        {user.devices?.length ?? 0}
      </div>
    </Button>
  );
};

export default UserBox;
