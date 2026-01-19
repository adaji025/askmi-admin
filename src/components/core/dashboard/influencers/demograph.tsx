"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import AudienceInterest from "./audience-interest";

const Demograph = () => {
  const t = useTranslations("influencers.demographics");
  const [demographics, setDemographics] = useState({
    ageRange: "25-34",
    language: "english",
    gender: "female",
    primaryLocation: "israel",
  });

  const [performanceStats] = useState({
    averageVotes: 2843,
    performanceScore: 58,
    voteAccuracy: 96.5,
  });

  const handleSave = () => {
    // In production, this would save to the backend
    console.log("Saving demographics:", demographics);
  };

  const getLocationDisplay = (location: string) => {
    const locations: Record<string, { flag: string; name: string }> = {
      israel: { flag: "🇮🇱", name: t("israel") },
      usa: { flag: "🇺🇸", name: t("usa") },
      uk: { flag: "🇬🇧", name: t("uk") },
      canada: { flag: "🇨🇦", name: t("canada") },
      nigeria: { flag: "🇳🇬", name: t("nigeria") },
    };
    return locations[location] || { flag: "", name: location };
  };

  const getStatusBadge = (value: number, type: "votes" | "score" | "accuracy") => {
    if (type === "votes") {
      return (
        <Badge className="bg-[#10B981] rounded min-w-20 text-white border-0 py-1.5">
          {t("excellent")}
        </Badge>
      );
    }
    if (type === "score") {
      return (
        <Badge className="bg-[#EDAE40] text-white border-0 rounded min-w-20 py-1.5">
          {t("okay")}
        </Badge>
      );
    }
    if (type === "accuracy") {
      return (
        <Badge className="bg-[#10B981] text-white border-0 rounded min-w-20 py-1.5">
          {t("verified")}
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Demographics Section */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">
            {t("demographics")}
          </h3>
          <Button
            onClick={handleSave}
            variant="outline"
            className="h-9 bg-[#F5F5F5] border-[#E2E8F0] text-foreground hover:bg-[#E5E5E5]"
          >
            <Save className="h-4 w-4 mr-2" />
            {t("save")}
          </Button>
        </div>

        <div className="space-y-3">
          {/* Age Range */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {t("ageRange")}
            </Label>
            <Select
              value={demographics.ageRange}
              onValueChange={(value) =>
                setDemographics({ ...demographics, ageRange: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-24">18 - 24</SelectItem>
                <SelectItem value="25-34">25 - 34</SelectItem>
                <SelectItem value="35-44">35 - 44</SelectItem>
                <SelectItem value="45-54">45 - 54</SelectItem>
                <SelectItem value="55+">55+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {t("language")}
            </Label>
            <Select
              value={demographics.language}
              onValueChange={(value) =>
                setDemographics({ ...demographics, language: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">{t("english")}</SelectItem>
                <SelectItem value="hebrew">{t("hebrew")}</SelectItem>
                <SelectItem value="spanish">{t("spanish")}</SelectItem>
                <SelectItem value="french">{t("french")}</SelectItem>
                <SelectItem value="arabic">{t("arabic")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {t("gender")}
            </Label>
            <Select
              value={demographics.gender}
              onValueChange={(value) =>
                setDemographics({ ...demographics, gender: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t("male")}</SelectItem>
                <SelectItem value="female">{t("female")}</SelectItem>
                <SelectItem value="other">{t("other")}</SelectItem>
                <SelectItem value="preferNotToSay">
                  {t("preferNotToSay")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Primary Location */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {t("primaryLocation")}
            </Label>
            <Select
              value={demographics.primaryLocation}
              onValueChange={(value) =>
                setDemographics({ ...demographics, primaryLocation: value })
              }
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue>
                  {(() => {
                    const location = getLocationDisplay(demographics.primaryLocation);
                    return (
                      <div className="flex items-center gap-2">
                        <span>{location.flag}</span>
                        <span>{location.name}</span>
                      </div>
                    );
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="israel">
                  <div className="flex items-center gap-2">
                    <span>🇮🇱</span>
                    <span>{t("israel")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="usa">
                  <div className="flex items-center gap-2">
                    <span>🇺🇸</span>
                    <span>{t("usa")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="uk">
                  <div className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    <span>{t("uk")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="canada">
                  <div className="flex items-center gap-2">
                    <span>🇨🇦</span>
                    <span>{t("canada")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="nigeria">
                  <div className="flex items-center gap-2">
                    <span>🇳🇬</span>
                    <span>{t("nigeria")}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Performance Statistics Section */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <h3 className="text-lg font-bold text-foreground mb-6">
          {t("performanceStatistics")}
        </h3>

        <div className="space-y-4">
          {/* Average Votes */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground mb-1 block">
                {t("averageVotes")}
              </Label>
              <p className="text-2xl font-bold text-foreground">
                {performanceStats.averageVotes.toLocaleString()}
              </p>
            </div>
            {getStatusBadge(performanceStats.averageVotes, "votes")}
          </div>

          {/* Performance Score */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground mb-1 block">
                {t("performanceScore")}
              </Label>
              <p className="text-2xl font-bold text-foreground">
                {performanceStats.performanceScore}%
              </p>
            </div>
            {getStatusBadge(performanceStats.performanceScore, "score")}
          </div>

          {/* Vote Accuracy */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground mb-1 block">
                {t("voteAccuracy")}
              </Label>
              <p className="text-2xl font-bold text-foreground">
                {performanceStats.voteAccuracy}%
              </p>
            </div>
            {getStatusBadge(performanceStats.voteAccuracy, "accuracy")}
          </div>
        </div>
      </div>

      {/* Audience Interest */}
      <AudienceInterest />
    </div>
  );
};

export default Demograph;
