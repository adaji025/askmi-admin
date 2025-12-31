import React from "react";
import { Check, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface OCRScreenshot {
  id: number;
  brandName: string;
  brandEmail: string;
  influencerHandle: string;
  extractedVotes: number;
  status: "normal" | "low-confidence" | "possible-fraud";
  timeAgo: string;
  screenshotUrl?: string;
}

interface ScreenshotCardProps {
  screenshot: OCRScreenshot;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return "bg-[#10B981]";
    case "low-confidence":
      return "bg-[#EDAE40]";
    case "possible-fraud":
      return "bg-[#EB5757]";
    default:
      return "bg-gray-500";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "normal":
      return "Normal";
    case "low-confidence":
      return "Low Confidence";
    case "possible-fraud":
      return "Possible Fraud";
    default:
      return status;
  }
};

const ScreenshotCard = ({
  screenshot,
  isSelected,
  onToggle,
}: ScreenshotCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow">
      {/* Checkbox */}
      <div className="p-3 border-b border-[#E2E8F0]">
        <button
          onClick={() => onToggle(screenshot.id)}
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
            isSelected
              ? "bg-[#2563EB] border-[#2563EB]"
              : "bg-white border-[#E2E8F0] hover:border-[#2563EB]"
          )}
        >
          {isSelected && <Check className="h-3 w-3 text-white" />}
        </button>
      </div>

      {/* Screenshot Image */}
      <div className="p-4 bg-[#F5F5F5] flex items-center justify-center">
        <div className="w-full max-w-30 aspect-9/16 bg-linear-to-b from-blue-100 to-gray-200 rounded-lg border border-gray-300 shadow-inner relative overflow-hidden">
          {/* Mock phone screen content */}
          <div className="absolute inset-0 flex flex-col">
            <div className="h-8 bg-blue-200"></div>
            <div className="flex-1 bg-gray-100"></div>
          </div>
        </div>
      </div>

      {/* Brand/Influencer Info */}
      <div className="p-4 space-y-1">
        <h3 className="font-bold text-sm text-foreground">
          {screenshot.brandName}
        </h3>
        <p className="text-xs text-muted-foreground">{screenshot.brandEmail}</p>
        <p className="text-xs text-muted-foreground">
          {screenshot.influencerHandle}
        </p>
      </div>

      {/* Extracted Votes */}
      <div className="px-4 pb-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-[#F8F8F9] rounded-md hover:bg-[#F0F0F0] transition-colors w-full">
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Extracted votes
          </span>
          <span className="ml-auto text-sm font-bold text-foreground">
            {screenshot.extractedVotes.toLocaleString()}
          </span>
        </button>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-3 bg-[#0F172A]">
        <div className="flex items-center justify-between">
          <span className="text-white text-xs font-medium">{screenshot.timeAgo}</span>
          <span className={cn("px-3 py-1 rounded text-white text-xs font-medium", getStatusColor(screenshot.status))}>
            {getStatusLabel(screenshot.status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotCard;
