"use client";
import {
  BrandsSVG,
  CampaignsSVG,
} from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { WadOfMoneySVG } from "@/components/core/dashboard/svg";
import { useGetBrands } from "@/features/brands/use-get-brands";
import { useTranslations } from "next-intl";
import BrandsComponent from "@/components/core/dashboard/brands/index";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

const Brands = () => {
  const t = useTranslations("brands.stats");
  const { data, isPending, isError, error, refetch } = useGetBrands();
  const statistics = data?.statistics;
  const brands = data?.brands;

  const stats = [
    {
      title: t("total brands"),
      value: isPending ? "…" : String(statistics?.totalBrands ?? 0),
      icon: BrandsSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#EAF5FF]",
      breakdown: [
        { label: t("brands"), value: isPending ? 0 : (statistics?.totalBrands ?? 0) },
        { label: t("influencers"), value: 0 },
      ],
    },
    {
      title: t("active campaigns"),
      value: isPending
        ? "…"
        : String(statistics?.activeCampaigns ?? 0),
      icon: CampaignsSVG,
      trend: "+4.2%",
      trendType: "up" as const,
      bgColor: "bg-[#F0F2FF]",
      breakdown: [
        { label: t("pending"), value: isPending ? 0 : (statistics?.pendingCampaigns ?? 0) },
        { label: t("completed"), value: isPending ? 0 : (statistics?.completedCampaigns ?? 0) },
      ],
    },
    {
      title: t("total revenue"),
      value: isPending ? "…" : formatUsd(statistics?.totalRevenue ?? 0),
      icon: WadOfMoneySVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#FDF8E1]",
      breakdown: [
        {
          label: t("votes delivered this week"),
          value: isPending ? 0 : (statistics?.totalVotes ?? 0),
        },
      ],
    },
  ];
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <BrandsComponent
        brands={brands}
        isLoading={isPending}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
      />
    </div>
  );
};

export default Brands;
