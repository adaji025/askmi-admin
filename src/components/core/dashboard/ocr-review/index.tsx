"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ScreenshotCard from "./screenshot-card";

type StatusFilter = "all" | "normal" | "low-confidence" | "possible-fraud";

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

const mockScreenshots: OCRScreenshot[] = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    brandName: "TechCo Market Research",
    brandEmail: "contact@techco.com",
    influencerHandle: "@sarah_lifestyle",
    extractedVotes: 3256,
    status:
      index % 3 === 0
        ? "normal"
        : index % 3 === 1
        ? "low-confidence"
        : "possible-fraud",
    timeAgo: "2 mins ago",
  }));

const OCRReviewComponent = () => {
  const t = useTranslations("ocr-review.main");
  const tFilters = useTranslations("ocr-review.filters");
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>("all");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(
    new Set([1, 3])
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const itemsPerPage = 9;

  // Hardcoded counts
  const counts = {
    all: 355,
    normal: 321,
    "low-confidence": 30,
    "possible-fraud": 4,
  };

  const statusOptions: Array<{
    value: StatusFilter;
    label: string;
    count: number;
  }> = [
    { value: "all", label: tFilters("all"), count: counts.all },
    { value: "normal", label: tFilters("normal"), count: counts.normal },
    {
      value: "low-confidence",
      label: tFilters("lowConfidence"),
      count: counts["low-confidence"],
    },
    {
      value: "possible-fraud",
      label: tFilters("possibleFraud"),
      count: counts["possible-fraud"],
    },
  ];

  const toggleSelection = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredScreenshots.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredScreenshots.map((s) => s.id)));
    }
  };

  // Filter screenshots based on selected filter
  const filteredScreenshots = mockScreenshots.filter((screenshot) => {
    if (selectedFilter === "all") return true;
    return screenshot.status === selectedFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredScreenshots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedScreenshots = filteredScreenshots.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: StatusFilter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
        return tFilters("normal");
      case "low-confidence":
        return tFilters("lowConfidence");
      case "possible-fraud":
        return tFilters("possibleFraud");
      default:
        return status;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header: Filters, Actions, Search */}
      <div className="bg-white rounded-lg border border-[#E2E8F0]">
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-[#F5F5F5] overflow-x-auto rounded-lg p-1">
          {statusOptions.map((option) => {
            const isSelected = selectedFilter === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={cn(
                  "flex-1 justify-center flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
                  isSelected
                    ? "bg-white text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className={cn(isSelected ? "font-bold" : "font-medium")}>
                  {option.label}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium px-2 py-0.5 rounded-md text-white",
                    isSelected
                      ? option.value === "normal"
                        ? "bg-[#10B981]"
                        : option.value === "low-confidence"
                        ? "bg-[#EDAE40]"
                        : option.value === "possible-fraud"
                        ? "bg-[#EB5757]"
                        : "bg-[#2563EB]"
                      : "bg-[#6B7280]"
                  )}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-2 justify-between xl:items-center">
        <div className="">
          {t("showingScreenshots", { count: filteredScreenshots.length })}
        </div>
        <div className="flex flex-col xl:flex-row gap-2">
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="default"
              className="bg-[#2563EB] text-xs hover:bg-[#2563EB]/90 text-white"
              disabled={selectedItems.size === 0}
            >
              {t("approveSelected")} ({selectedItems.size})
            </Button>
            <Button
              variant="destructive"
              className="bg-[#EB5757] text-xs hover:bg-[#EB5757]/90 text-white"
              disabled={selectedItems.size === 0}
            >
              {t("rejectSelected")} ({selectedItems.size})
            </Button>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 h-10 bg-white border-border text-xs placeholder:text-xs"
              />
            </div>
            <Button
              variant="outline"
              className="h-10 px-4 bg-white border-border hover:bg-muted"
            >
              {t("sort")}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Screenshot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedScreenshots.map((screenshot) => {
          const isSelected = selectedItems.has(screenshot.id);
          return (
            <ScreenshotCard
              key={screenshot.id}
              screenshot={screenshot}
              isSelected={isSelected}
              onToggle={toggleSelection}
            />
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4 px-6">
        <div className="text-sm text-muted-foreground">
          {t("page")} {currentPage} {t("of")} {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 bg-white border-border hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(page as number)}
                  className={cn(
                    "h-8 w-8",
                    currentPage === page
                      ? "bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
                      : "bg-white border-border hover:bg-muted"
                  )}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 bg-white border-border hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("jumpToPage")}</span>
          <Input
            type="number"
            placeholder="#"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && jumpToPage) {
                handlePageChange(parseInt(jumpToPage));
                setJumpToPage("");
              }
            }}
            className="w-16 h-8 bg-white border-border text-center"
            min={1}
            max={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default OCRReviewComponent;
