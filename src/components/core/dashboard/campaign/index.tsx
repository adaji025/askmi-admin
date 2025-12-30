"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import React from "react";

const CampaignComp = () => {
  const [status, setStatus] = React.useState<"all" | "active" | "completed">(
    "all"
  );

  const campaignStatus: Array<{
    value: "all" | "active" | "completed";
    label: string;
    count: number;
  }> = [
    { value: "all", label: "All", count: 12 },
    { value: "active", label: "Active", count: 5 },
    { value: "completed", label: "Completed", count: 7 },
  ];
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-10">
        <div className="flex gap-2 border rounded-lg p-0.5 order-2 lg:order-1">
          {campaignStatus.map((item) => (
            <button
              onClick={() => setStatus(item.value)}
              className={`flex-1 flex items-center gap-1 justify-center py-2.5 px-4 rounded-md text-sm font-medium transition-all xl:min-w-32 w-full ${
                status === item.value
                  ? "bg-white text-foreground border border-[#E2E8F0]"
                  : "text-muted-foreground hover:text-foreground "
              }`}
            >
              <div>{item.label}</div>{" "}
              <div
                className={`text-[10px] flex items-center text-white font-medium justify-center rounded-full h-4 w-4 ${
                  status === item.value ? "bg-black" : "bg-[#8E8E8E]"
                }`}
              >
                {item.count}
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 order-1 lg:order-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              className="pl-9 w-64 h-11.5"
            />
          </div>
          <Button className="mt-4 shrink-0 text-sm! rounded-md bg-[#2563eb] px-6 py-6 font-semibold hover:bg-[#1d4ed8] md:mt-0 md:self-end">
            <PlusCircle className="h-5 w-5" />
            New campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignComp;
