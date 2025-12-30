import { BillingSettings } from "@/components/core/dashboard/billing/billing-settings";
import { TransactionHistory } from "@/components/core/dashboard/billing/transaction-history";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import React from "react";

const stats = [
  {
    title: "Total Spend",
    value: "$5,010",
    bgColor: "bg-[#D8F3DC]", // Light Blue
  },
  {
    title: "Current Month",
    value: "$6,010",
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Avg Cost Per Vote",
    value: "$0.5",
    bgColor: "bg-[#F0F2FF]", // Light Lavender
  },
  {
    title: "Pending",
    value: "$1,867",
    bgColor: "bg-[#FDF8E1]", // Light Blue
  },
] as const;

const Billings = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <div className="">Dynamic billing based on actual votes delivered</div>
        <Button
          size="sm"
          className="bg-[#2563EB] cursor-pointer rounded-md text-sm font-medium px-3 text-white hover:bg-blue-700 border-none shadow-none"
        >
          Download Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-10">
        <BillingSettings />
      </div>

      <div className="mt-6">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Billings;
