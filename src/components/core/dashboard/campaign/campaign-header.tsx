"use client";

import { ArrowLeft, Pause } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function CampaignHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center h-full flex-1 justify-between bg-background px-4 sm:px-6">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-sm shadow-none rounded-md font-semibold bg-transparent py-3.5 border border-[#EBEBEB]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to campaigns</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-sm shadow-none rounded-md font-semibold bg-transparent py-3.5 border border-[#EBEBEB]"
        >
          <Pause className="h-4 w-4 fill-current" />
          Pause
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-sm shadow-none rounded-md font-semibold bg-transparent py-3.5 border border-[#EBEBEB]"
        >
          Export
        </Button>
        <Button
          size="sm"
          className="bg-[#2563EB] rounded-md text-sm font-medium text-white hover:bg-blue-700 border-none shadow-none"
        >
          Campaign settings
        </Button>
      </div>
    </div>
  );
}
