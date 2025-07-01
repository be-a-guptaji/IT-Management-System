// @app/(Dashboard)/layout.tsx

// Components
import { SidebarProvider } from "@/components/ui/sidebar";
import NavigationSidebar from "@/components/navigation/Index";
import Header from "@/components/header/Index";
import Footer from "@/components/footer/Index";

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
        <NavigationSidebar isAdmin />
        <main className="h-screen w-full overflow-x-hidden">
          <Header />
          {children}
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
