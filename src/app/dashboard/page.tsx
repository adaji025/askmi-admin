"use client";

import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import {
  ActiveCampaignSVG,
  CompletionRateSVG,
  TotalResponseSVG,
  TotalSurveySVG,
} from "@/components/core/dashboard/dashboard/stat-card/svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { VoteDeliveryChart } from "@/components/core/dashboard/dashboard/vote-delivery-chart";
import OCRProcessingQueue from "@/components/core/dashboard/dashboard/ocr-que-processing";
import { OCRAccuracyTrends } from "@/components/core/dashboard/dashboard/ocr-accuracy-trend";
import TopOverPerformer from "@/components/core/dashboard/dashboard/top-over-performer";
import UnderOverPerformingInfluencers from "@/components/core/dashboard/dashboard/under-performing-influencers";

const Dashboard = () => {
  const t = useTranslations("dashboard.stats");

  const stats = [
    {
      title: t("activeCampaigns"),
      value: "20",
      icon: ActiveCampaignSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#EAF5FF]", // Light Blue
      breakdown: [
        { label: t("brands"), value: 15 },
        { label: t("influencers"), value: 5 },
      ],
    },
    {
      title: t("totalResponses"),
      value: "20",
      icon: TotalResponseSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
      breakdown: [
        { label: t("pending"), value: 15 },
        { label: t("completed"), value: 5 },
      ],
    },
    {
      title: t("totalSurveys"),
      value: "20",
      icon: TotalSurveySVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#EAF5FF]",
      breakdown: [{ label: t("votes delivered this week"), value: 238 }], // Light Blue
    },
    {
      title: t("completionRate"),
      value: "20%",
      icon: CompletionRateSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
    },
  ];

  interface CampaignProps {
    id: number;
    title: string;
    responses: number;
    totalResponses: number;
    status: "active";
  }

  interface ActivityProps {
    id: number;
    title: string;
    metric: number;
    timeAgo: string;
  }
  const tSections = useTranslations("dashboard.sections");
  const tEmpty = useTranslations("dashboard.emptyStates");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-4">
        <VoteDeliveryChart />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        {/* Active Campaigns Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-semibold">
            {tSections("activeCampaigns")}
          </h2>
          <div className="space-y-4">
            <OCRProcessingQueue />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">{tSections("recentActivity")}</h2>
          <OCRAccuracyTrends />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        <TopOverPerformer />
        <UnderOverPerformingInfluencers />
      </div>
    </div>
  );
};

export default Dashboard;
