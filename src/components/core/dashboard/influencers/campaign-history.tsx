"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const mockCampaigns: Campaign[] = Array(18)
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
    ocrAccuracy: 99.2,
  }));

const CampaignHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-[#10B981] text-white border-0">
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
      case "lagging":
        return "bg-[#10B981]";
      default:
        return "bg-gray-500";
    }
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) =>
    campaign.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0]">
      {/* Top Section: Title, Search, Sort */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 border-b border-[#E2E8F0]">
        <div className="text-sm font-medium text-foreground">
          Showing {filteredCampaigns.length} Campaigns
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search Campaigns..."
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
            {filteredCampaigns.map((campaign) => {
              const progressPercentage =
                (campaign.delivered / campaign.targetVotes) * 100;
              const isPositiveDeviation = campaign.deviation > 0;

              return (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {campaign.campaign}
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
    </div>
  );
};

export default CampaignHistory;
