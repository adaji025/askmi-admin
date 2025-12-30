"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface OCRStatItem {
  label: string;
  value: string | number;
}

const OCRProcessingQueue = () => {
  const t = useTranslations("dashboard.ocr");

  const stats: OCRStatItem[] = [
    { label: t("processedToday"), value: "2,314" },
    { label: t("autoVerified"), value: "1,937" },
    { label: t("pendingReview"), value: "249" },
    { label: t("flaggedFraud"), value: "16" },
    { label: t("ocrErrors"), value: "58" },
  ];

  return (
    <div className="space-y-4">
      {/* Title */}
      <h2 className="font-bold text-slate-900">{t("title")}</h2>

      {/* Stat Cards */}
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#F8F8F9] rounded-lg p-3 "
          >
            <span className="text-sm text-slate-600 font-medium">
              {stat.label}
            </span>
            <span className="text-sm font-bold text-slate-900">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Review Queue Button */}
      <div className="pt-2 flex justify-center">
        <Button className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-medium py-6 rounded-lg">
          {t("reviewQueue")}
        </Button>
      </div>
    </div>
  );
};

export default OCRProcessingQueue;
