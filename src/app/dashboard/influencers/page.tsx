import { InfluencersSVG } from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { TotalSurveySVG } from "@/components/core/dashboard/dashboard/stat-card/svg";
import ActiveInfluencerCard from "@/components/core/dashboard/influencers/active-influencer-card";
import InfluencersTable from "@/components/core/dashboard/influencers/influencers-table";
import { InboxSVG } from "@/components/core/dashboard/svg";
import React from "react";

const stats = [
  {
    title: "Verified influencers",
    value: "20",
    icon: InfluencersSVG,
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Avg votes per survey",
    value: "20",
    icon: InboxSVG,
    bgColor: "bg-[#F0F2FF]", // Light Lavender
  },
  {
    title: "Total Surveys",
    value: "20",
    icon: TotalSurveySVG,
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
] as const;
const Influencers = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <InfluencersTable />
      <div className="mt-10">
        <ActiveInfluencerCard />
      </div>
    </div>
  );
};

export default Influencers;
