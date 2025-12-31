"use client";

import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { useTranslations } from "next-intl";
import { VoteDeliveryChart } from "@/components/core/dashboard/dashboard/vote-delivery-chart";
import OCRProcessingQueue from "@/components/core/dashboard/dashboard/ocr-que-processing";
import { OCRAccuracyTrends } from "@/components/core/dashboard/dashboard/ocr-accuracy-trend";
import TopOverPerformer from "@/components/core/dashboard/dashboard/top-over-performer";
import UnderOverPerformingInfluencers from "@/components/core/dashboard/dashboard/under-performing-influencers";
import {
  CampaignsSVG,
  OCRAccuracySVG,
  UsersSVG,
  VoteDeliverySVG,
} from "@/components/core/dashboard/dashboard/layout/svg";

const Dashboard = () => {
  const t = useTranslations("dashboard.stats");

  const stats = [
    {
      title: t("Total Users"),
      value: "1,020",
      icon: UsersSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#EAF5FF]", // Light Blue
      breakdown: [
        { label: t("brands"), value: 15 },
        { label: t("influencers"), value: 5 },
      ],
    },
    {
      title: t("active campaigns"),
      value: "20",
      icon: CampaignsSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
      breakdown: [
        { label: t("pending"), value: 15 },
        { label: t("completed"), value: 5 },
      ],
    },
    {
      title: t("vote delivery"),
      value: "92%",
      icon: VoteDeliverySVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#FDF8E1]",
      breakdown: [{ label: t("votes delivered this week"), value: 238 }], // Light Blue
    },
    {
      title: t("OCR accuracy"),
      value: "90%",
      icon: OCRAccuracySVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#E5F7E8]", // Light Lavender
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
        <OCRProcessingQueue />
        <OCRAccuracyTrends />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        <TopOverPerformer />
        <UnderOverPerformingInfluencers />
      </div>
    </div>
  );
};

export default Dashboard;
