"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/language-store";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType;
  }[];
}) {
  const pathname = usePathname();
  const { isRTL } = useLanguageStore();

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    // Make campaigns active for both /dashboard/campaigns and /dashboard/create-campaign
    if (url === "/dashboard/campaigns") {
      return pathname.startsWith("/dashboard/campaigns") || pathname === "/dashboard/create-campaign";
    }
    return pathname.startsWith(url);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarGroupLabel className={cn("md:pl-4 rtl:md:pr-4 rtl:md:pl-0")}>MAIN</SidebarGroupLabel>
          <SidebarMenu className={cn("md:ml-2 rtl:md:mr-2 rtl:md:ml-0")}>
            {items.slice(0, 4).map((item) => {
              const active = isActive(item.url);
              return (
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "hover:bg-[#2563EB1A] hover:border hover:border-[#17274D] hover:text-white",
                        isRTL 
                          ? "hover:border-l-4 hover:border-l-[#2563EB] rtl:hover:border-r-0"
                          : "hover:border-r-4 hover:border-r-[#2563EB]",
                        active && "bg-[#2563EB1A] border border-[#17274D] text-white",
                        isRTL && active
                          ? "border-l-4 border-l-[#2563EB] rtl:border-r-0"
                          : active && "border-r-4 border-r-[#2563EB]"
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarGroupLabel className={cn("-mb-2 pl-4 rtl:pr-4 rtl:pl-0")}>MANAGE</SidebarGroupLabel>
          <SidebarMenu className={cn("md:ml-2 rtl:md:mr-2 rtl:md:ml-0")}>
            {items.slice(4).map((item) => {
              const active = isActive(item.url);
              return (
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "pl-3 hover:bg-[#2563EB1A] hover:border hover:border-[#17274D] hover:text-white",
                        isRTL 
                          ? "rtl:pl-0 rtl:pr-3 hover:border-l-4 hover:border-l-[#2563EB] rtl:hover:border-r-0"
                          : "hover:border-r-4 hover:border-r-[#2563EB]",
                        active && "bg-[#2563EB1A] border border-[#17274D] text-white",
                        isRTL && active
                          ? "rtl:pl-0 rtl:pr-3 border-l-4 border-l-[#2563EB] rtl:border-r-0"
                          : active && "border-r-4 border-r-[#2563EB]"
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
