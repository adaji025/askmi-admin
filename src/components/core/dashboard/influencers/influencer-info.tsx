"use client";

import React from "react";
import { useTranslations } from "next-intl";

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
const InfluencerInfo = ({influencerInfo}: IProps) => {
  const t = useTranslations("influencers.profile");

  return (
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
          <p className="text-xs text-muted-foreground mb-1">{t("instagramHandle")}</p>
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
          <p className="text-xs text-muted-foreground mb-1">{t("emailAddress")}</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.email}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t("accountCreated")}</p>
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
    </div>
  );
};

export default InfluencerInfo;
