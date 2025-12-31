"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, ChevronDown, Smile, Mail, Shield, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BagSVG } from "../svg";

interface Influencer {
  id: number;
  name: string;
  username: string;
  avatar: string;
  status: "active" | "pending" | "suspended";
  totalCampaigns: number;
  avgVotesDelivered: number;
  performanceScore: number;
  deviationTrend: number; // percentage
  ocrAccuracy: number; // percentage
}

const mockInfluencers: Influencer[] = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: "Sarah Johnson",
  username: "sarah_lifestyle",
  avatar: "",
  status: "active",
  totalCampaigns: 23,
  avgVotesDelivered: 32056,
  performanceScore: 1,
  deviationTrend: 4.2,
  ocrAccuracy: 96.2,
}));

type StatusFilter = "all" | "active" | "pending" | "suspended";

const InfluencersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;
  const [jumpToPage, setJumpToPage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Hardcoded counts
  const counts = {
    all: 133,
    active: 127,
    pending: 20,
    suspended: 13,
  };

  const statusOptions: Array<{
    value: StatusFilter;
    label: string;
    count: number;
  }> = [
    { value: "all", label: "All", count: counts.all },
    { value: "active", label: "Active", count: counts.active },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "suspended", label: "Suspended", count: counts.suspended },
  ];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Filter influencers based on selected filter
  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    if (selectedFilter === "all") return true;
    return influencer.status === selectedFilter;
  });

  return (
    <div className="w-full mt-10 max-w-[calc(100vw-300px)] 2xl:max-w-[calc(100vw-280px)] min-w-0 bg-white rounded-lg">
      {/* Top Section: Filters, Search, Sort */}
      <div className="flex flex-col gap-4 p-4 border-b border-[#E2E8F0]">
        {/* Filter Tabs */}
        <div className="flex gap-2 bg-[#F5F5F5] rounded-lg p-1">
          {statusOptions.map((option) => {
            const isSelected = selectedFilter === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={cn(
                  "flex-1 flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all",
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
                      ? option.value === "active"
                        ? "bg-[#10B981]"
                        : option.value === "pending"
                        ? "bg-[#EDAE40]"
                        : option.value === "suspended"
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

        {/* Search and Sort */}
        <div className="flex items-center justify-end gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search influencers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 h-10 bg-white border-border"
            />
          </div>
          <Button
            variant="outline"
            className="h-10 px-4 bg-white border-border hover:bg-muted"
          >
            Sort
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader className="bg-[#FAFAFA] border-b border-[#E2E8F0]">
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              INFLUENCER
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              TOTAL CAMPAIGNS
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              AVG VOTES DELIVERED
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              PERFORMANCE SCORE
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              DEVIATION TREND
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              OCR ACCURACY
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground w-24">
              {/* Actions column */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInfluencers.map((influencer, index) => (
            <TableRow
              key={index}
              className={cn(
                "border-b border-[#E2E8F0] hover:bg-[#FAFAFA] transition-colors",
                index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
              )}
            >
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {/* Status indicator */}
                    <div className="h-2 w-2 rounded-full bg-[#10B981] shrink-0" />
                    {/* Avatar */}
                    <Avatar className="h-10 w-10 bg-[#8B5CF6]">
                      <AvatarFallback className="bg-[#8B5CF6] text-white text-xs font-semibold">
                        {getInitials(influencer.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-black">
                      {influencer.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      @{influencer.username}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 px-6">
                <span className="text-sm text-foreground">{influencer.totalCampaigns}</span>
              </TableCell>
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <BagSVG />
                  <span className="text-sm text-foreground font-medium">
                    {influencer.avgVotesDelivered.toLocaleString()}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B5CF60D] border border-[#8B5CF626]">
                  <span className="text-sm font-medium text-[#8B5CF6]">
                    {influencer.performanceScore}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-1 text-sm text-[#10B981] font-medium">
                  <span>+{influencer.deviationTrend}%</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </TableCell>
              <TableCell className="py-4 px-6">
                <span className="text-sm text-[#10B981] font-medium">
                  {influencer.ocrAccuracy}%
                </span>
              </TableCell>
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    title="View"
                  >
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    title="Message"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    title="Shield"
                  >
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4 px-6">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
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
          <span className="text-sm text-muted-foreground">Jump to page</span>
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

export default InfluencersTable;
