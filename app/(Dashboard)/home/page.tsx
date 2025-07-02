// @app/(Dashboard)/home/page.tsx

// Components
import { Input } from "@/components/ui/input";
import UserBox from "@/components/ui/UserBox";

const page = () => {
  return (
    <>
      <div className="flex min-h-full flex-wrap items-center justify-center gap-12 p-16">
        <Input />
        {Array.from({ length: 127 }, (_, i) => (
          <UserBox id={(i + 1).toString()} key={(i + 1).toString()} />
        ))}
      </div>
    </>
  );
};

export default page;
