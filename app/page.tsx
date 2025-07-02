// @app/page.tsx

import { redirect } from "next/navigation";

export default function page() {
  redirect("/home");

  return (
    <>
      <div>Login page</div>
    </>
  );
}
