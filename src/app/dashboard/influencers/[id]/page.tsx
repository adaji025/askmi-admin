"use client";

import React from "react";
import { Mail, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InfluencerDetailsComponent from "@/components/core/dashboard/influencers";

const InfluencerDetails = () => {
  // Mock data - in production, this would be fetched based on the ID from route params
  const influencerData = {
    username: "@sarah_lifestyle",
    email: "sarah.j@example.com",
    joinDate: "March 2024",
    location: "Lagos, Nigeria",
    avatar: "/avatars/sarah.jpg", // You can add a default avatar image
  };

  const stats = [
    {
      title: "Average Votes",
      value: "3,567",
      trend: "+4.2%",
      trendType: "up" as const,
      description: "All time",
    },
    {
      title: "Delivery Accuracy",
      value: "110%",
      trend: "+4.2%",
      trendType: "up" as const,
      description: "Above average",
    },
    {
      title: "OCR Accuracy",
      value: "97%",
      trend: "+4.2%",
      trendType: "up" as const,
      description: "Above average",
    },
    {
      title: "Total Earnings",
      value: "$567",
      trend: "+4.2%",
      trendType: "up" as const,
      description: "No outstanding payment",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Panel: User Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-4 lg:p-6 space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F3F4F6] mb-4">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={influencerData.avatar}
                    alt={influencerData.username}
                  />
                  <AvatarFallback className="bg-[#8B5CF6] text-white text-base font-bold">
                    SL
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-base font-bold text-foreground">
                {influencerData.username}
              </h2>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {influencerData.email}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  Joined {influencerData.joinDate}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {influencerData.location}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 pt-4">
              <Button className="flex-1 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white h-10">
                Send Email
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#EDAE40] text-[#EDAE40] hover:bg-[#EDAE40]/10 h-10"
              >
                Suspend
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel: Statistics */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col justify-between p-5 rounded-lg h-full min-h-40 bg-white"
                )}
              >
                {/* Top section: Trend on right */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    {stat.title}
                  </h3>

                  {stat.trend && (
                    <div
                      className={cn(
                        "flex text-sm items-center gap-1 font-medium",
                        stat.trendType === "up"
                          ? "text-green-600"
                          : "text-rose-500"
                      )}
                    >
                      <span>{stat.trend}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Title */}

                {/* Large main value */}
                <span className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
                  {stat.value}
                </span>

                {/* Description at bottom */}
                {stat.description && (
                  <div className="text-[10px] text-slate-700">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <InfluencerDetailsComponent />
    </>
  );
};

export default InfluencerDetails;
