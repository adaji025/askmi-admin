"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ScreenshotCard from "@/components/core/dashboard/ocr-review/screenshot-card";

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

const mockScreenshots: OCRScreenshot[] = Array(6)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    brandName: "TechCo Market Research",
    brandEmail: "contact@techco.com",
    influencerHandle: "@sarah_lifestyle",
    extractedVotes: 32056,
    status: "normal" as const,
    timeAgo: "2 mins ago",
  }));

const OCRActivity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredScreenshots = mockScreenshots.filter(
    (screenshot) =>
      screenshot.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screenshot.brandEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screenshot.influencerHandle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="text-sm font-medium text-foreground">
          Showing{" "}
          <span className="text-[#2563EB] font-bold">
            {filteredScreenshots.length}
          </span>{" "}
          Screenshots
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-white border-[#E2E8F0]"
            />
          </div>
          {/* Sort */}
          <Button
            variant="outline"
            className="h-10 border-[#E2E8F0] bg-white"
          >
            Sort
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Screenshot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScreenshots.map((screenshot) => (
          <ScreenshotCard
            key={screenshot.id}
            screenshot={screenshot}
            isSelected={selectedItems.has(screenshot.id)}
            onToggle={toggleSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default OCRActivity;
