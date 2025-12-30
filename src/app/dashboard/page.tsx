"use client";

import { activities, campaigns } from "@/components/core/dashboard/data";
import { ActivityItem } from "@/components/core/dashboard/dashboard/recent-active-item";
import { CampaignCard } from "@/components/core/dashboard/dashboard/campaign-card";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import {
  ActiveCampaignSVG,
  CompletionRateSVG,
  TotalResponseSVG,
  TotalSurveySVG,
} from "@/components/core/dashboard/dashboard/stat-card/svg";
import Image from "next/image";
import { CampaignCTA } from "@/components/core/dashboard/dashboard/campaign-card/campaign-cta";
import { useTranslations } from "next-intl";

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
    },
    {
      title: t("totalResponses"),
      value: "20",
      icon: TotalResponseSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
    },
    {
      title: t("totalSurveys"),
      value: "20",
      icon: TotalSurveySVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#EAF5FF]", // Light Blue
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

      {/* Campaign CTA */}
      <div className="mt-4">
        <CampaignCTA />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        {/* Active Campaigns Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-semibold">{tSections("activeCampaigns")}</h2>
          <div className="space-y-4">
            {campaigns.length ? (
              campaigns?.map((campaign: CampaignProps) => (
                <CampaignCard
                  key={campaign.id}
                  title={campaign.title}
                  responses={campaign.responses}
                  totalResponses={campaign.totalResponses}
                  status={campaign.status}
                />
              ))
            ) : (
              <div className="min-h-50 gap-2 text-[#8E8E8E] text-sm flex flex-col justify-center items-center">
                <Image
                  src={"/images/svgs/campaign-filled.svg"}
                  width={20}
                  height={20}
                  alt="No Active Campaigns"
                />
                {tEmpty("noActiveCampaigns")}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">{tSections("recentActivity")}</h2>
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
              {tEmpty("noRecentActivity")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
