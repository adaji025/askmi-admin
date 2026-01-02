"use client";

import { InfluencersSVG } from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import InfluencersTable from "@/components/core/dashboard/influencers/influencers-table";
import {
  HeartUserSVG,
  InboxSVG,
  ShieldUserSVG,
} from "@/components/core/dashboard/svg";
import { useTranslations } from "next-intl";

const Influencers = () => {
  const t = useTranslations("influencers.stats");

  const stats = [
    {
      title: t("totalInfluencers"),
      value: "20",
      icon: InfluencersSVG,
      bgColor: "bg-[#E7F2FD]", // Light Blue
    },
    {
      title: t("pendingApprovals"),
      value: "20",
      icon: InboxSVG,
      bgColor: "bg-[#FDF8E1]", // Light Lavender
    },
    {
      title: t("flaggedForRisk"),
      value: "20",
      icon: ShieldUserSVG,
      bgColor: "bg-[#EEEFFC]", // Light Blue
    },
    {
      title: t("topPerformers"),
      value: "20",
      icon: HeartUserSVG,
      bgColor: "bg-[#E5F7E8]", // Light Blue
    },
  ] as const;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <InfluencersTable />
    </div>
  );
};

export default Influencers;
