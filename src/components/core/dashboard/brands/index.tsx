"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import BrandsTable from "./brands-table";

type StatusFilter = "all" | "flagged";

const BrandsComponent = () => {
  const t = useTranslations("brands.filters");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");

  // Hardcoded counts
  const counts = {
    all: 892,
    flagged: 0,
  };

  const statusOptions: Array<{
    value: StatusFilter;
    label: string;
    count: number;
  }> = [
    { value: "all", label: t("all"), count: counts.all },
    { value: "flagged", label: t("flagged"), count: counts.flagged },
  ];

  return (
    <div>
      <div className="flex gap-2 bg-[#F5F5F5] rounded-lg p-1">
        {statusOptions.map((option) => {
          const isSelected = selectedStatus === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={cn(
                "flex-1 flex items-center text-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                isSelected
                  ? "bg-white text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className={cn(isSelected ? "font-bold" : "font-medium")}>
                {option.label}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-md text-white",
                  isSelected
                    ? option.value === "flagged"
                      ? "bg-[#EB5757]"
                      : "bg-[#2563EB]"
                    : "bg-[#6B7280]"
                )}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
      <BrandsTable selectedFilter={selectedStatus} />
    </div>
  );
};

export default BrandsComponent;
