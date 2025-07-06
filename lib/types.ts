// @/lib/types.ts

export type ManageUserPageProps = {
  params: Promise<{ UserID: string }>;
};

export type UserStore = {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
};
