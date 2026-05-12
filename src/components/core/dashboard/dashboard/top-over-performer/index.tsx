"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import type { DashboardPerformer } from "@/features/dashboard/use-get-dashboard-stats";

interface TopOverPerformerProps {
  performers: DashboardPerformer[];
}

const TopOverPerformer = ({ performers }: TopOverPerformerProps) => {
  const t = useTranslations("dashboard.topPerformers");

  return (
    <div className="w-full bg-white rounded-lg p-5">
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-1">{t("title")}</h3>
        <p className="text-sm text-slate-600">{t("subtitle")}</p>
      </div>

      {/* Performers List */}
      <div className="space-y-3">
        {performers.map((performer) => (
          <div
            key={performer.influencerId}
            className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border border-slate-200"
          >
            {/* Left: Avatar */}
            <div className="shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage alt={performer.fullName} />
                <AvatarFallback className="bg-linear-to-br from-purple-400 to-pink-400 text-white">
                  {performer.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Middle: Name and Username */}
            <div className="flex-1 ml-4">
              <div className="font-bold text-slate-900 text-sm">
                {performer.fullName}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {performer.handle}
              </div>
            </div>

            {/* Right: Performance Metric */}
            <div className="shrink-0">
              <span className="font-bold text-green-600">
                +{performer.deviationPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopOverPerformer;
