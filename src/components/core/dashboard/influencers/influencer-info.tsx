"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Edit, Pen } from "lucide-react";
import EditAigeneratedText from "./edit-aigenerated-text";

interface IProps {
  influencerInfo: {
    fullName: string;
    instagramHandle: string;
    followers: string;
    following: string;
    email: string;
    accountCreated: string;
    location: string;
  };
}
const InfluencerInfo = ({ influencerInfo }: IProps) => {
  const t = useTranslations("influencers.profile");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nicheAnalysisText, setNicheAnalysisText] = useState(
    "Sarah Johnson is an influencer that mostly has a following of fashion and tech heads. She has done well in recent campaigns with successful polls"
  );

  const handleSave = (text: string) => {
    setNicheAnalysisText(text);
  };

  return (
    <>
    <EditAigeneratedText
      open={isEditModalOpen}
      onOpenChange={setIsEditModalOpen}
      initialText={nicheAnalysisText}
      onSave={handleSave}
    />
    <div className="bg-white rounded-lg border border-[#E2E8F0]">
      <h3 className="font-bold text-foreground mb-6 border-b border-[#E2E8F0] py-4  px-5 lg:px-6">
        {t("influencerInformation")}
      </h3>
      <div className="space-y-5 grid grid-cols-2 p-5 lg:p-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("fullName")}</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.fullName}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {t("instagramHandle")}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.instagramHandle}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("followers")}</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.followers}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("following")}</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.following}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {t("emailAddress")}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.email}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            {t("accountCreated")}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.accountCreated}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("location")}</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.location}
          </p>
        </div>
      </div>

      <div className="mt-10 p-5 lg:p-6">
        <div className="flex g4 items-center justify-between">
          <div className="font-medium text-[#8A97A0] text-xs">INFLUENCER NICHE ANALYSIS</div>
          <div className="flex gap-2 items-center">
            <Badge className="text-xs text-[#8B5CF6] bg-[#8B5CF633] rounded">AI Generated</Badge>
            <div
              role="button"
              onClick={() => setIsEditModalOpen(true)}
              className="flex gap-1 items-center text-xs cursor-pointer"
            >
              <div>Edit</div>
              <Pen className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="mt-2 border p-2.5 rounded text-sm">
          {nicheAnalysisText}
        </div>
      </div>
    </div>
    </>
  );
};

export default InfluencerInfo;
