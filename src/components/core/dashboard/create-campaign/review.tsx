"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, User, Users } from "lucide-react";
import { format } from "date-fns";
import React from "react";

const Review = () => {
  // Mock data - in a real app, this would come from props or context
  const surveyTitle = "Product Feedback Survey";
  const targetAudience = [
    { label: "North America", icon: MapPin },
    { label: "18-24", icon: User },
    { label: "All genders", icon: Users },
  ];
  const totalVotes = "25,000 votes";
  const deviationRange = "±20%";
  const startDate = new Date("2025-01-11");
  const costPerVote = "$0.2";

  const ReviewRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <>
      <div className="flex items-center justify-between py-4">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="text-sm font-bold">{value}</div>
      </div>
      <Separator />
    </>
  );

  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-4 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">Survey</span>
        <h2 className="text-xl font-bold tracking-tight">{surveyTitle}</h2>
      </div>

      <Separator />

      {/* Review Details */}
      <div className="space-y-0">
        <ReviewRow
          label="Target audience"
          value={
            <div className="flex items-center gap-2">
              {targetAudience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-[#E2E8F0] rounded border-none text-[#8A97A0] font-normal"
                  >
                    <Icon className="w-3 h-3" />
                    {item.label}
                  </Badge>
                );
              })}
            </div>
          }
        />
        <ReviewRow label="Total votes needed" value={totalVotes} />
        <ReviewRow label="Deviation range" value={deviationRange} />
        <ReviewRow
          label="Start date"
          value={format(startDate, "MMMM dd, yyyy")}
        />
        <ReviewRow label="Cost per vote" value={costPerVote} />
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <Button
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
        >
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default Review;
