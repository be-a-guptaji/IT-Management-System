// @app/(Dashboard)/manage-devices/[UserID]/Page.tsx

// Types
import { ManageUserPageProps } from "@/lib/types";

export default async function Page({ params }: ManageUserPageProps) {
  const { UserID } = await params;

  return (
    <>
      <div>{UserID}</div>
    </>
  );
}
