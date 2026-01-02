"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import InfluencerInfo from "./influencer-info";
import VerificationStatus from "./verification-status";
import CampaignHistory from "./campaign-history";
import OCRActivity from "./ocr-activity";

type TabType = "profile" | "campaign-history" | "ocr-activity";

const InfluencerDetailsComponent = () => {
  const t = useTranslations("influencers.tabs");
  const tProfile = useTranslations("influencers.profile");
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Mock data - in production, this would be fetched based on the ID
  const influencerInfo = {
    fullName: "Sarah Johnson",
    instagramHandle: "@sarah_lifestyle",
    followers: "24,875 followers",
    following: "1,256 following",
    email: "sarah.j@example.com",
    accountCreated: "March 15, 2024",
    location: "Lagos, Nigeria",
  };

  const verificationStatus = [
    { label: tProfile("emailAddressLabel"), status: tProfile("verified"), verified: true },
    { label: tProfile("instagram"), status: tProfile("connected"), verified: true },
    { label: tProfile("identity"), status: tProfile("verified"), verified: true },
  ];

  const tabs = [
    { id: "profile" as TabType, label: t("profile") },
    { id: "campaign-history" as TabType, label: t("campaignHistory") },
    { id: "ocr-activity" as TabType, label: t("ocrActivity") },
  ];

  return (
    <div className="w-full space-y-6 mt-6">
      {/* Tabs */}
      <div className="flex gap-2 border rounded-md p-1 border-[#E2E8F0]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center text-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-white text-foreground border border-[#E2E8F0]"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfluencerInfo influencerInfo={influencerInfo} />
          <VerificationStatus verificationStatus={verificationStatus} />
        </div>
      )}

      {activeTab === "campaign-history" && <CampaignHistory />}

      {activeTab === "ocr-activity" && <OCRActivity />}
    </div>
  );
};

export default InfluencerDetailsComponent;
