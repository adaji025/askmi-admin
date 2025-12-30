"use client";

import { AppSidebar } from "@/components/core/dashboard/dashboard/layout/app-sidebar";
import { SiteHeader } from "@/components/core/dashboard/dashboard/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLanguageStore } from "@/store/language-store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isRTL } = useLanguageStore();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "240px",
          "--header-height": "calc(var(--spacing) * 12 + 20px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" side={isRTL ? "right" : "left"} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-3 sm:p-5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
