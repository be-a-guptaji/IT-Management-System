// @/lib/types.ts

import { IUser } from "@/lib/models/User.model";
import { IDevice } from "@/lib/models/Device.model";

export type ManageUserPageProps = {
  params: Promise<{ userID: string }>;
};

export type UserStore = {
  name: string;
  completeUser: UserWithDevices | null;
  setName: (name: string) => void;
  setCompleteUser: (user: UserWithDevices | null) => void;
  resetName: () => void;
  resetCompleteUser: () => void;
};

export type UserWithDevices = IUser & { devices: IDevice[] };
