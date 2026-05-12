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
import { useGetDashboardStats } from "@/features/dashboard/use-get-dashboard-stats";

const Dashboard = () => {
  const t = useTranslations("dashboard.stats");
  const { data } = useGetDashboardStats();
  const dashboardStats = data?.stats;

  const stats = [
    {
      title: t("Total Users"),
      value: (dashboardStats?.users.totalUsers ?? 0).toLocaleString(),
      icon: UsersSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#EAF5FF]", // Light Blue
      breakdown: [
        { label: t("brands"), value: dashboardStats?.users.brands ?? 0 },
        { label: t("influencers"), value: dashboardStats?.users.influencers ?? 0 },
      ],
    },
    {
      title: t("active campaigns"),
      value: (dashboardStats?.campaigns.activeCampaigns ?? 0).toLocaleString(),
      icon: CampaignsSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
      breakdown: [
        { label: t("pending"), value: dashboardStats?.campaigns.pendingCampaigns ?? 0 },
        { label: t("completed"), value: dashboardStats?.campaigns.completedCampaigns ?? 0 },
      ],
    },
    {
      title: t("vote delivery"),
      value: `${(dashboardStats?.votes.voteDelivery ?? 0).toFixed(2)}%`,
      icon: VoteDeliverySVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#FDF8E1]",
      breakdown: [
        {
          label: t("votes delivered this week"),
          value: (dashboardStats?.votes.totalVotes ?? 0).toLocaleString(),
        },
      ], // Light Blue
    },
    {
      title: t("OCR accuracy"),
      value: `${(dashboardStats?.ocr.ocrAccuracy ?? 0).toFixed(2)}%`,
      icon: OCRAccuracySVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#E5F7E8]", // Light Lavender
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-4">
        <VoteDeliveryChart data={data?.voteCollectionOverTime ?? []} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        <OCRProcessingQueue
          processedToday={data?.ocrQueue.processedToday ?? 0}
          autoVerified={data?.ocrQueue.autoVerified ?? 0}
          pendingReview={data?.ocrQueue.pendingReview ?? 0}
          flaggedFraud={data?.ocrQueue.flaggedFraud ?? 0}
        />
        <OCRAccuracyTrends data={data?.ocrAccuracyTrend ?? []} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        <TopOverPerformer performers={data?.topPerformers ?? []} />
        <UnderOverPerformingInfluencers
          performers={data?.underPerformingInfluencers ?? []}
        />
      </div>
    </div>
  );
};

export default Dashboard;
