"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, PlusCircle, Search } from "lucide-react";
import React from "react";
import { BrandsSVG } from "../dashboard/layout/svg";
import { useTranslations } from "next-intl";
import { StatCard } from "../dashboard/stat-card";
import CampaignTable from "./campaign-table";

const CampaignComp = () => {
  const [status, setStatus] = React.useState<"all" | "active" | "completed" | "lagging">(
    "all"
  );
  const t = useTranslations("campaign.stats");
  const tFilters = useTranslations("campaign.filters");
  const tMain = useTranslations("campaign.main");
  const tBrands = useTranslations("brands.stats");
  
  const stats = [
    {
      title: t("totalCampaigns"),
      value: "20",
      icon: BrandsSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#EAF5FF]", // Light Blue
      breakdown: [
        { label: tBrands("brands"), value: 15 },
        { label: tBrands("influencers"), value: 5 },
      ],
    },
    {
      title: t("activeNow"),
      value: "20",
      icon: BrandsSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
      breakdown: [
        { label: tBrands("pending"), value: 15 },
        { label: tBrands("completed"), value: 5 },
      ],
    },
    {
      title: t("laggingCampaigns"),
      value: "20",
      icon: BrandsSVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#FDF8E1]",
      breakdown: [{ label: tBrands("votes delivered this week"), value: 238 }], // Light Blue
    },
  ];

  const campaignStatus: Array<{
    value: "all" | "active" | "completed" | "lagging";
    label: string;
    count: number;
    color: string;
  }> = [
    { value: "all", label: tFilters("all"), count: 12, color: "#2563EB" },
    { value: "active", label: tFilters("active"), count: 5, color: "#2AC670" },
    { value: "lagging", label: tFilters("lagging"), count: 5, color: "#EDAE40" },
    { value: "completed", label: tFilters("completed"), count: 7, color: "#2563EB" },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="flex gap-2 border rounded-lg p-0.5 order-2 lg:order-1 mt-10">
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
              className="text-[10px] flex items-center text-white font-medium justify-center rounded-full h-4 w-4"
              style={{
                backgroundColor: status === item.value ? item.color : "#8E8E8E",
              }}
            >
              {item.count}
            </div>
          </button>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-10 mt-4">
        <div className="">
          {tMain("showingCampaigns", { count: 147 })}
        </div>
        <div className="flex items-center justify-between gap-4 order-1 lg:order-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={tMain("searchPlaceholder")}
              className="pl-9 w-64 h-11.5"
            />
          </div>
          <Button
            variant="outline"
            className="h-11.5 px-4 bg-white border-border hover:bg-muted"
          >
            {tMain("sort")}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <CampaignTable />
      </div>
    </div>
  );
};

export default CampaignComp;
