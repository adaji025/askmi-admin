"use client";

import type React from "react";

import { useState } from "react";
import {
  HelpCircle,
  MapPin,
  Building2,
  User,
  Users,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}
export function CampaignSetup({ handleNext }: IProps) {
  const [surveyType, setSurveyType] = useState<"existing" | "new">("existing");
  const [votes, setVotes] = useState([25000]);

  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-12 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Basic Information */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Basic Information</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="campaign-name"
              className="text-sm font-semibold text-muted-foreground"
            >
              Campaign name
            </Label>
            <Input
              id="campaign-name"
              placeholder="Name your campaign"
              className="h-12 bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Short description about your campaign"
              className="min-h-30 bg-white resize-none"
            />
          </div>
        </div>
      </section>

      {/* Survey Details */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Survey Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSurveyType("existing")}
            className={cn(
              "flex flex-col items-start p-6 rounded-xl border transition-all text-left group",
              surveyType === "existing"
                ? "border-primary bg-primary/5"
                : "border-border bg-white hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full mb-4",
                surveyType === "existing"
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              )}
            />
            <h3 className="font-bold mb-1">Use existing survey</h3>
            <p className="text-sm text-muted-foreground">
              Choose from your existing surveys
            </p>
          </button>
          <button
            onClick={() => setSurveyType("new")}
            className={cn(
              "flex flex-col items-start p-6 rounded-xl border transition-all text-left group",
              surveyType === "new"
                ? "border-primary bg-primary/5"
                : "border-border bg-white hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full mb-4",
                surveyType === "new" ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
            <h3 className="font-bold mb-1">Create new survey</h3>
            <p className="text-sm text-muted-foreground">
              Build a new survey from scratch
            </p>
          </button>
        </div>
      </section>

      {/* Target Audience */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Target Audience</h2>
        <div className="flex flex-wrap gap-3">
          <AudienceSelect
            icon={<MapPin className="w-4 h-4" />}
            label="Regions"
          />
          <AudienceSelect
            icon={<Building2 className="w-4 h-4" />}
            label="Cities"
          />
          <AudienceSelect icon={<User className="w-4 h-4" />} label="Ages" />
          <AudienceSelect
            icon={<Users className="w-4 h-4" />}
            label="Genders"
          />
          <AudienceSelect
            icon={<Sparkles className="w-4 h-4" />}
            label="Interests"
          />
        </div>
      </section>

      {/* Campaign Goals */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold tracking-tight">Campaign Goals</h2>
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <Label className="text-sm font-semibold text-muted-foreground mb-2">
              Total votes needed
            </Label>
            <span className="text-2xl font-bold">
              {votes[0].toLocaleString()}
            </span>
          </div>
          <div className="space-y-4">
            <Slider
              value={votes}
              onValueChange={setVotes}
              min={50}
              max={50000}
              step={50}
              className="**:[[role=slider]]:h-5 **:[[role=slider]]:w-5"
            />
            <div className="flex justify-between text-sm font-medium text-muted-foreground/60">
              <span>50</span>
              <span>50,000</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-semibold text-muted-foreground">
                Deviation range
              </Label>
              <HelpCircle className="w-4 h-4 text-primary cursor-help" />
            </div>
            <Select defaultValue="recommended">
              <SelectTrigger className="h-12 bg-white w-full">
                <SelectValue placeholder="Select deviation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">±20% (Recommended)</SelectItem>
                <SelectItem value="strict">±10% (Strict)</SelectItem>
                <SelectItem value="flexible">±30% (Flexible)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={() => handleNext("Budget & Timeline")}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function AudienceSelect({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  const [value, setValue] = useState<string>("");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-auto h-12 px-6 rounded-full bg-white border-border hover:border-primary/50 transition-colors gap-3 group">
        {icon}
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {label}</SelectItem>
        <SelectItem value="custom">Custom {label}</SelectItem>
      </SelectContent>
    </Select>
  );
}
