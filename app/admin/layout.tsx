import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

import "../globals.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <Toaster position="top-right" richColors />
          <div className="flex flex-1">
            {/* Sidebar - Persistent */}
            <AppSidebar />

            {/* Main Content with Sidebar Inset */}
            <SidebarInset>
              <SiteHeader />
              <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Dynamic Page Content */}
                {children}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
