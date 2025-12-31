"use client";

import React from "react";
import { Eye, BarChart3, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PollOption {
  label: string;
  votes: number;
}

interface OCRReviewDetailsProps {
  ocrConfidence: {
    status: "Good" | "Fair" | "Poor";
    percentage: number;
  };
  performanceCheck: {
    status: "Good" | "Fair" | "Poor";
    votes: number;
  };
  question: string;
  pollOptions: PollOption[];
  screenshotDetails: {
    influencer: string;
    campaign: string;
    brand: string;
    uploadTime: string;
  };
  onApprove?: () => void;
  onReject?: () => void;
}

const OCRReviewDetails: React.FC<OCRReviewDetailsProps> = ({
  ocrConfidence,
  performanceCheck,
  question,
  pollOptions,
  screenshotDetails,
  onApprove,
  onReject,
}) => {
  const router = useRouter();
  const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0);
  const maxVotes = Math.max(...pollOptions.map((opt) => opt.votes), 1);

  const handleApprove = () => {
    if (onApprove) {
      onApprove();
    } else {
      // Default behavior: navigate back
      console.log("Approved");
      router.back();
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    } else {
      // Default behavior: navigate back
      console.log("Rejected");
      router.back();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "text-[#10B981]";
      case "Fair":
        return "text-[#EDAE40]";
      case "Poor":
        return "text-[#EB5757]";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Section: Extracted Poll Data */}
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-lg font-bold text-foreground">Extracted Poll Data</h2>

        {/* OCR Confidence Card */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
              <Eye className="h-5 w-5 text-[#7C3AED]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">OCR Confidence</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-sm font-medium", getStatusColor(ocrConfidence.status))}>
                  {ocrConfidence.status}
                </span>
                <span className="text-sm font-bold text-[#10B981]">
                  {ocrConfidence.percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Check Card */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-[#7C3AED]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Performance Check</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-sm font-medium", getStatusColor(performanceCheck.status))}>
                  {performanceCheck.status}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {performanceCheck.votes.toLocaleString()} votes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question & Poll Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Question & Poll Options</h3>
          <p className="text-base font-bold text-foreground">{question}</p>

          <div className="space-y-3">
            {pollOptions.map((option, index) => {
              const percentage = maxVotes > 0 ? (option.votes / maxVotes) * 100 : 0;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-2"
                >
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {option.votes.toLocaleString()} votes
                    </span>
                    <div className="w-4 h-4 rounded bg-[#2563EB]"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Votes Card */}
          <div className="bg-[#0F172A] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Total Votes</span>
              <span className="text-sm font-bold text-white">
                {totalVotes.toLocaleString()} votes
              </span>
            </div>
          </div>
        </div>

        {/* Screenshot Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Screenshot Details</h3>
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Influencer</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.influencer}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Campaign</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.campaign}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Brand</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.brand}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Upload Time</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.uploadTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Visual Poll and Actions */}
      <div className="space-y-6">
        {/* Poll Visual Overlay */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[500px] flex items-center justify-center p-8">
          {/* Poll Card Overlay */}
          <div className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden">
            {/* Header */}
            <div className="bg-[#2563EB] px-4 py-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">{question}</h3>
            </div>

            {/* Poll Options */}
            <div className="p-4 space-y-4">
              {pollOptions.map((option, index) => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{option.label}</span>
                      <span className="text-sm font-medium text-foreground">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-8 bg-gray-200 rounded overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all flex items-center",
                          percentage > 0 ? "bg-[#2563EB]" : "bg-gray-300"
                        )}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleApprove}
            className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90 text-white h-12"
          >
            <Check className="h-5 w-5 mr-2" />
            Approve
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1 bg-[#6B7280] hover:bg-[#6B7280]/90 text-white border-0 h-12"
          >
            <X className="h-5 w-5 mr-2" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OCRReviewDetails;
