import DashboardHeader from "@/components/dashboard/header";
import DashboardNavigation from "@/components/dashboard/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="w-full md:flex md:min-h-[100dvh] md:flex-row-reverse lg:container lg:max-w-360">
          <SessionProvider>
            <div className="w-full lg:border-r">
              <DashboardHeader />
              <div className="container max-w-256">{children}</div>
            </div>
          </SessionProvider>
          <DashboardNavigation />
        </div>
      </ThemeProvider>
      <Toaster position="top-right" />
    </body>
  );
}
