"use client";
import { AgeDistribution } from "@/components/core/dashboard/analytics/age-distribution";
import { VoteCollectionChart } from "@/components/core/dashboard/analytics/vote-collection-chart";
import {
  CampaignsSVG,
  InfluencersSVG,
  SurveysSVG,
} from "@/components/core/dashboard/dashboard/layout/svg";
import { ActivityItem } from "@/components/core/dashboard/dashboard/recent-active-item";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { activities } from "@/components/core/dashboard/data";
import { ExportSVG, WadOfMoneySVG } from "@/components/core/dashboard/svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface ActivityProps {
  id: number;
  title: string;
  metric: number;
  timeAgo: string;
}

const stats = [
  {
    title: "Total Votes",
    value: "20, 000",
    icon: InfluencersSVG,
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Active Campaigns",
    value: "4",
    icon: CampaignsSVG,
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Avg Response Rate",
    value: "78%",
    icon: SurveysSVG,
    bgColor: "bg-[#F0F2FF]", // Light Lavender
  },
  {
    title: "Total Spend",
    value: "$63,771",
    icon: WadOfMoneySVG,
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
] as const;

const Analytics = () => {
  const [time, setTime] = React.useState("All Time");
  const timeItems = [
    "All Time",
    "Last Month",
    "This Month",
    "Last Year",
    "This Year",
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Campaign performance and insight metrics all in all</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="">All Time</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{time}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  {timeItems.map((item, index) => (
                    <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            size="sm"
            className="bg-[#2563EB] cursor-pointer rounded-md text-sm font-medium px-3 text-white hover:bg-blue-700 border-none shadow-none"
          >
            <ExportSVG />
            Export Report
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="mt-10">
        <VoteCollectionChart />
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 mt-10">
        <AgeDistribution />
        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">Recent Activity</h2>
          {activities.length ? (
            <div className="divide-y divide-border">
              {activities.map((activity: ActivityProps) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.title}
                  metric={activity.metric}
                  timeAgo={activity.timeAgo}
                />
              ))}
            </div>
          ) : (
            <div className="min-h-50 text-sm text-[#8E8E8E] flex flex-col justify-center items-center">
              No Recent Activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
