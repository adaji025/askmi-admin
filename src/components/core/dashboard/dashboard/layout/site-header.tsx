"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LanguageDropdown from "./lang-dropdown";
import { LogoutSVG } from "./svg";
import { CampaignHeader } from "../../campaign/campaign-header";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/campaigns": "Campaigns",
  "/dashboard/surveys": "Surveys",
  "/dashboard/analytics": "Analytics",
  "/dashboard/influencers": "Influencers",
  "/dashboard/billings": "Billings",
  "/dashboard/settings": "Settings",
};

export function SiteHeader() {
  const pathname = usePathname();
  const pageName = pageNames[pathname] || "Dashboard";
  const { isRTL } = useLanguageStore();

  // Check if we're on a campaign detail page (/dashboard/campaigns/[id])
  const isCampaignDetailPage =
    pathname.startsWith("/dashboard/campaigns/") &&
    pathname !== "/dashboard/campaigns" &&
    pathname !== "/dashboard/campaigns/create-camapaign";

  return (
    <header className="flex h-(--header-height) shrink-0 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      {!isCampaignDetailPage && (
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className={cn("-ml-1 rtl:ml-0 rtl:-mr-1")} />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-2xl font-extrabold">{pageName}</h1>
          <div className={cn("ml-auto flex items-center gap-2 rtl:ml-0 rtl:mr-auto")}>
            <LanguageDropdown />
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="size-4" />
              <span className={cn(
                "absolute top-1 size-2 bg-[#8B5CF6] rounded-full",
                isRTL ? "left-1.5 right-auto" : "right-1.5 left-auto"
              )}></span>
            </Button>
            <Button variant="ghost" size="sm" className="cursor-pointer">
              <LogoutSVG />
            </Button>
          </div>
        </div>
      )}
      {isCampaignDetailPage && <CampaignHeader />}
    </header>
  );
}
