"use client";
import {
  BrandsSVG,
  CampaignsSVG,
} from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { WadOfMoneySVG } from "@/components/core/dashboard/svg";
import { useTranslations } from "next-intl";
import BrandsComponent from "@/components/core/dashboard/brands/index";

const Brands = () => {
  const t = useTranslations("brands.stats");
  const stats = [
    {
      title: t("total brands"),
      value: "20",
      icon: BrandsSVG,
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
      title: t("total revenue"),
      value: "20",
      icon: WadOfMoneySVG,
      trend: "-0.03%",
      trendType: "down" as const,
      bgColor: "bg-[#FDF8E1]",
      breakdown: [{ label: t("votes delivered this week"), value: 238 }], // Light Blue
    },
  ];
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <BrandsComponent />
    </div>
  );
};

export default Brands;
