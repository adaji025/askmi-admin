"use client";

import React from "react";
import { Eye, BarChart3, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <div className="order-2 lg:order-1">
        <div className="space-y-6 bg-white">
          {/* Performance Check Card */}
          <div className="p-5">
            {/* Header */}
            <h2 className="text-lg font-bold text-foreground border-b pb-4 mb-4">
              Extracted Poll Data
            </h2>

            {/* OCR Confidence Card */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-[#F8F8F9] p-3">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    OCR Confidence
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        getStatusColor(ocrConfidence.status)
                      )}
                    >
                      {ocrConfidence.status}
                    </span>
                    <span className="text-sm font-bold text-[#10B981]">
                      {ocrConfidence.percentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#F8F8F9] p-3">
                <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-[#7C3AED]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Performance Check
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        getStatusColor(performanceCheck.status)
                      )}
                    >
                      {performanceCheck.status}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {performanceCheck.votes.toLocaleString()} votes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <h3 className="text-sm font-semibold text-foreground">
                Question & Poll Options
              </h3>
              <p className="text-base font-bold text-foreground">{question}</p>

              <div className="space-y-4">
                {pollOptions.map((option, index) => {
                  const percentage =
                    maxVotes > 0 ? (option.votes / maxVotes) * 100 : 0;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-2"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {option.label}
                      </p>
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
            </div>
            {/* Total Votes Card */}
          </div>
          <div className="bg-[#0F172A] rounded-b-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Total Votes
              </span>
              <span className="text-sm font-bold text-white">
                {totalVotes.toLocaleString()} votes
              </span>
            </div>
          </div>
        </div>

        {/* Question & Poll Options */}

        {/* Screenshot Details */}
        <div className="space-y-4 mt-6">
          <h3 className="text-sm font-semibold text-foreground">
            Screenshot Details
          </h3>
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 space-y-3">
            <div className="flex justify-between bg-[#F8F8F9] p-3 rounded">
              <span className="text-sm text-muted-foreground">Influencer</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.influencer}
              </span>
            </div>
            <div className="flex justify-between bg-[#F8F8F9] p-3 rounded">
              <span className="text-sm text-muted-foreground">Campaign</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.campaign}
              </span>
            </div>
            <div className="flex justify-between bg-[#F8F8F9] p-3 rounded">
              <span className="text-sm text-muted-foreground">Brand</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.brand}
              </span>
            </div>
            <div className="flex justify-between bg-[#F8F8F9] p-3 rounded">
              <span className="text-sm text-muted-foreground">Upload Time</span>
              <span className="text-sm font-medium text-foreground">
                {screenshotDetails.uploadTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Visual Poll and Actions */}
      <div className="space-y-6 oreder-1 lg:order-2">
        {/* Poll Visual Overlay */}
        <Image
          src={"/images/svgs/screenshot.svg"}
          width={400}
          height={586}
          alt="screenshot"
          className="mx-auto"
        />

        {/* Action Buttons */}
        <div className="flex gap-3 max-w-62.5 mx-auto">
          <Button
            onClick={handleApprove}
            className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90 text-white h-10"
          >
            <Check className="h-5 w-5 mr-2" />
            Approve
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1 bg-[#6B7280] hover:bg-[#6B7280]/90 text-white border-0 h-10"
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
