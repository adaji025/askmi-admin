"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

interface Performer {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  performance: string;
}

const TopOverPerformer = () => {
  const t = useTranslations("dashboard.topPerformers");

  const performers: Performer[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarah_lifestyle",
      performance: "+18.5%",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      username: "@sarah_lifestyle",
      performance: "+18.5%",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      username: "@sarah_lifestyle",
      performance: "+18.5%",
    },
  ];

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
            key={performer.id}
            className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border border-slate-200"
          >
            {/* Left: Avatar */}
            <div className="shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={performer.avatar} alt={performer.name} />
                <AvatarFallback className="bg-linear-to-br from-purple-400 to-pink-400 text-white">
                  {performer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Middle: Name and Username */}
            <div className="flex-1 ml-4">
              <div className="font-bold text-slate-900 text-sm">
                {performer.name}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {performer.username}
              </div>
            </div>

            {/* Right: Performance Metric */}
            <div className="shrink-0">
              <span className="font-bold text-green-600">
                {performer.performance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopOverPerformer;
