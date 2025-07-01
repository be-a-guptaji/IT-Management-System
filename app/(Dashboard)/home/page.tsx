// @app/(Dashboard)/home/page.tsx

"use client";

// App Data
import { HomeNavigationItem } from "@/lib/constant";

// React
import { Fragment, useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Utils
import { cn } from "@/lib/utils";

// Sections
import AllPCsSection from "@/app/(Dashboard)/admin/home/_components/AllPCsSection";
import ManageUser from "@/app/(Dashboard)/admin/home/_components/ManageUser";
import ITPersonalForm from "@/app/(Dashboard)/admin/home/_components/ITPersonalForm";

const page = () => {
  const [section, setSection] = useState("All PCs");

  return (
    <>
      <header className="flex items-center justify-center gap-8 bg-slate-200 p-6 dark:bg-black">
        {HomeNavigationItem.map((item) => {
          const IconComponent = item.icon;
          return (
            <Fragment key={item.title}>
              <Button
                className={cn(
                  "flex w-48 cursor-pointer items-center gap-2 hover:scale-105 active:scale-95",
                  section === item.title &&
                    "bg-blue-500 hover:bg-blue-500 active:bg-blue-500"
                )}
                onClick={() => setSection(item.title)}
              >
                <span className="flex items-center gap-1 font-semibold">
                  <IconComponent /> {item.title}
                </span>
              </Button>
            </Fragment>
          );
        })}
      </header>

      <Separator className="z-10 h-1 bg-black/50 dark:bg-white/50" />

      <main className="flex min-h-[calc(100vh-13rem)] w-full flex-col bg-slate-200 p-10 dark:bg-[linear-gradient(135deg,_#0466c8,_#0353a4,_#023e7d,_#002855,_#001845,_#001233)]">
        {section === HomeNavigationItem[0].title && <AllPCsSection />}
        {section === HomeNavigationItem[1].title && <ManageUser />}
        {section === HomeNavigationItem[2].title && <ITPersonalForm />}
      </main>
    </>
  );
};

export default page;
