"use client";

import React, { useState, KeyboardEvent } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const AudienceInterest = () => {
  const t = useTranslations("influencers.audienceInterests");
  const [interests, setInterests] = useState<string[]>(["Fashion"]);
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    // In production, this would save to the backend
    console.log("Saving interests:", interests);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newInterest = inputValue.trim();
      if (!interests.includes(newInterest)) {
        setInterests([...interests, newInterest]);
        setInputValue("");
      }
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">
          {t("audienceInterests")}
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">
            {t("interestCategories")}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t("pressEnterToAdd")}
          </span>
        </div>

        <div className="relative">
          <div
            className={cn(
              "min-h-10 w-full rounded-md border border-[#E2E8F0] bg-transparent px-3 py-2",
              "flex flex-wrap items-center gap-2",
              "focus-within:border-[#2563EB] focus-within:ring-[3px] focus-within:ring-[#2563EB]/10"
            )}
          >
            {/* Tags */}
            {interests.map((interest, index) => (
              <Badge
                key={index}
                className="bg-[#ECF2FE] rounded text-[#2243A9] capitalize border-0 px-2 py-1 text-sm font-medium flex items-center gap-1.5"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:bg-[#2563EB]/80 rounded-full p-0.5 transition-colors"
                  aria-label={t("removeInterest", { interest })}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {/* Input */}
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("addInterest")}
              className="flex-1 min-w-30 border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceInterest;
