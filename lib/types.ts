// @/lib/types.ts

import { IUser } from "@/lib/models/User.model";
import { IDevice } from "@/lib/models/Device.model";

export type ManageUserPageProps = {
  params: Promise<{ userID: string }>;
};

export type UserStore = {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
};

export type UserWithDevices = IUser & { devices: IDevice[] };

export type AddOrEditUserType = {
  name: {
    firstName: string;
    middleName?: string | undefined;
    lastName?: string | undefined;
  };
  designation: string;
  para: number;
  devices?:
    | {
        deviceName: string;
        macAddress: string;
        ipAddress: string;
        serialNumber: string;
      }[]
    | undefined;
};

export type LoginUserType = { userName: string; password: string };

export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
