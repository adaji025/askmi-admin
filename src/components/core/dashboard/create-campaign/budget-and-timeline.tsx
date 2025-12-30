"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}

const BudgetAndTimeline = ({ handleNext }: IProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date("2025-11-01"));
  const [costPerVote, setCostPerVote] = useState("0.2");
  const [matchingType, setMatchingType] = useState<"automatic" | "manual">();

  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-12 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Budget & Timeline Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Budget & Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-sm font-semibold text-muted-foreground">
              Start date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-white",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd-MM-yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost-per-vote" className="text-sm font-semibold text-muted-foreground">
              Cost per vote
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="cost-per-vote"
                type="number"
                value={costPerVote}
                onChange={(e) => setCostPerVote(e.target.value)}
                className="h-12 pl-7 bg-white"
                placeholder="0.2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Influencer Matching Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Influencer Matching</h2>
        <button
          onClick={() => setMatchingType("automatic")}
          className={cn(
            "w-full flex items-start gap-4 p-6 rounded-xl border transition-all text-left",
            matchingType === "automatic"
              ? "border-primary bg-primary/5"
              : "border-border bg-white hover:border-primary/50"
          )}
        >
          <div
            className={cn(
              "w-3 h-3 rounded-full mt-1 shrink-0",
              matchingType === "automatic"
                ? "bg-primary"
                : "bg-muted-foreground/30"
            )}
          />
          <div className="flex-1">
            <h3 className="font-bold mb-1">Automatic</h3>
            <p className="text-sm text-muted-foreground">
              Use our AI-powered matching
            </p>
          </div>
        </button>
      </section>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={() => handleNext("Review")}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BudgetAndTimeline;
