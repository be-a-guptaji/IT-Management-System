// @/lib/types.ts

import { IUser } from "@/lib/models/User.model";
import { IDevice } from "@/lib/models/Device.model";

export type ManageUserPageProps = {
  params: Promise<{ UserID: string }>;
};

export type UserStore = {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
};

export type UserWithDevices = IUser & { devices: IDevice[] };
