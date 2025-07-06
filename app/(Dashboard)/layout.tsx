// @/app/(Dashboard)/layout.tsx

// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/navigation/Index";
import { Header } from "@/components/header/Index";
import { Footer } from "@/components/footer/Index";

// Types
import { ReactNode } from "react";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <SidebarProvider>
        <NavigationSidebar />
        <main className="h-screen w-full overflow-x-hidden bg-black/[0.07]">
          <Header />
          {children}
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
