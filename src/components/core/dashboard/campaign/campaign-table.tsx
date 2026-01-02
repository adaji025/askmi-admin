"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Campaign {
  id: number;
  campaign: string;
  brand: {
    name: string;
    initials: string;
  };
  status: "active" | "lagging" | "completed";
  targetVotes: number;
  delivered: number;
  deviation: number;
  ocrAccuracy: number;
}

const mockCampaigns: Campaign[] = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    campaign: "TechCo Market Research Q4",
    brand: {
      name: "TechCo Limited",
      initials: "TC",
    },
    status:
      index % 3 === 0
        ? "completed"
        : index % 3 === 1
          ? "lagging"
          : "active",
    targetVotes: 10000,
    delivered: index % 3 === 0 ? 10000 : 6549,
    deviation: index % 3 === 1 ? -0.03 : 4.2,
    ocrAccuracy: 96.2,
  }));

const CampaignTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const totalPages = 100;
  const itemsPerPage = 10;

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
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(99);
        pages.push(100);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(99);
        pages.push(100);
      }
    }

    return pages;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-[#2AC670] text-white border-0">
            Active
          </Badge>
        );
      case "lagging":
        return (
          <Badge className="bg-[#EDAE40] text-white border-0">
            Lagging
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-[#2563EB] text-white border-0">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#2563EB]";
      case "active":
        return "bg-[#2AC670]";
      case "lagging":
        return "bg-[#EDAE40]";
      default:
        return "bg-gray-500";
    }
  };

  // Calculate paginated campaigns
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCampaigns = mockCampaigns.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0]">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
              <TableHead className="font-semibold text-foreground">
                CAMPAIGN
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                BRAND
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                STATUS
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                TARGET VOTES
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                DELIVERED
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                DEVIATION
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                OCR ACCURACY
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCampaigns.map((campaign) => {
              const progressPercentage =
                (campaign.delivered / campaign.targetVotes) * 100;
              const isPositiveDeviation = campaign.deviation > 0;

              return (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium text-foreground hover:bg-transparent hover:underline"
                    >
                      {campaign.campaign}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 rounded-md bg-[#2563EB]">
                        <AvatarFallback className="bg-[#2563EB] text-white text-xs font-semibold">
                          {campaign.brand.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">
                        {campaign.brand.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="text-sm text-foreground">
                    {campaign.targetVotes.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2 min-w-30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">
                          {campaign.delivered.toLocaleString()} /{" "}
                          {campaign.targetVotes.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                        <div
                          className={cn(
                            "h-full transition-all",
                            getProgressColor(campaign.status)
                          )}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        isPositiveDeviation
                          ? "text-[#10B981]"
                          : "text-[#EB5757]"
                      )}
                    >
                      {isPositiveDeviation ? "+" : ""}
                      {campaign.deviation}%
                      {isPositiveDeviation ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-[#10B981]">
                      {campaign.ocrAccuracy}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4 px-6 border-t border-[#E2E8F0] bg-[#FAFAFA]">
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

export default CampaignTable;
