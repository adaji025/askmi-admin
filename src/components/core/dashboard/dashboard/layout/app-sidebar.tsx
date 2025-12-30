"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  AnalyticsSVG,
  BillingsSVG,
  CampaignsSVG,
  DashboardSVG,
  InfluencersSVG,
  SurveysSVG,
} from "./svg";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardSVG,
    },
    {
      title: "Campaign",
      url: "/dashboard/campaigns",
      icon: CampaignsSVG,
    },
    {
      title: "Surveys",
      url: "/dashboard/surveys",
      icon: SurveysSVG,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: AnalyticsSVG,
    },
    {
      title: "Influencers",
      url: "/dashboard/influencers",
      icon: InfluencersSVG,
    },
    {
      title: "Billings",
      url: "/dashboard/billings",
      icon: BillingsSVG,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SurveysSVG,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent hover:border-0 hover:border-r-0 active:border-0 active:border-r-0 data-[active=true]:border-0 data-[active=true]:border-r-0"
            >
              <a href="#">
                <Image
                  src={"/images/svgs/askmi-logo.svg"}
                  height={32}
                  width={90}
                  alt="askmi logo"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="text-center bg-[#302D54] p-1.5 rounded-sm text-[#8B5CF6] text-xs font-bold">
          CONTROL CENTER
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
