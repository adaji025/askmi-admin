"use client";

import { InfluencersSVG } from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { CompletionRateSVG } from "@/components/core/dashboard/dashboard/stat-card/svg";
import {
  ClockSVG,
  ScannerSVG,
  WarningSVG,
} from "@/components/core/dashboard/svg";
import OCRReviewComponent from "@/components/core/dashboard/ocr-review/index";

const OCRReview = () => {
  const stats = [
    {
      title: "pending Review",
      value: "20",
      icon: ScannerSVG,
      bgColor: "bg-[#E7F2FD]", // Light Blue
      trend: "+4.2%",
      trendType: "up" as const,
    },
    {
      title: "Flagged for risk",
      value: "20",
      icon: WarningSVG,
      bgColor: "bg-[#FDF8E1]", // Light Lavender
      trend: "+4.2%",
      trendType: "up" as const,
    },
    {
      title: "Avg review time",
      value: "20",
      icon: ClockSVG,
      bgColor: "bg-[#EEEFFC]", // Light Blue
      trend: "+4.2%",
      trendType: "up" as const,
    },
    {
      title: "auto-verify rate",
      value: "20",
      icon: CompletionRateSVG,
      bgColor: "bg-[#E5F7E8]", // Light Blue
      trend: "+4.2%",
      trendType: "up" as const,
    },
  ] as const;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <OCRReviewComponent />
    </div>
  );
};

export default OCRReview;
