"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { SurveysSVG } from "../dashboard/layout/svg";
import AddInfluencerDialog from "./add-influencer";

interface Influencer {
  id: number;
  name: string;
  username: string;
  avatar: string;
  avgVotes: number;
  performanceScore: number;
  completedSurveys: number;
  lastUpdated: string;
}

const mockInfluencers: Influencer[] = Array(10).fill({
  id: 1,
  name: "Sarah Johnson",
  username: "sarah_lifestyle",
  avatar: "",
  avgVotes: 1580,
  performanceScore: 1,
  completedSurveys: 15,
  lastUpdated: "2 days ago",
});

const InfluencersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;
  const [jumpToPage, setJumpToPage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

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

  return (
    <div className="w-full mt-10 max-w-[calc(100vw-300px)] 2xl:max-w-[calc(100vw-280px)] min-w-0 bg-white rounded-lg border border-[#E2E8F0]">
      {/* Table */}
      <Table>
        <TableHeader className="bg-[#FAFAFA] border-b border-[#E2E8F0]">
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              INFLUENCER
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              AVG VOTES/SURVEY
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              PERFORMANCE SCORE
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              COMPLETED SURVEYS
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              LAST UPDATED
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {/* Action column */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInfluencers.map((influencer, index) => (
            <TableRow
              key={index}
              className="border-b border-[#E2E8F0] hover:bg-[#FAFAFA] transition-colors"
            >
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-linear-to-br from-purple-400 to-pink-400">
                    <AvatarFallback className="text-white text-xs font-semibold">
                      {getInitials(influencer.name)}
                    </AvatarFallback>
                  </Avatar>
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
              <TableCell className="py-4 px-6 text-sm text-black font-medium">
                {influencer.avgVotes.toLocaleString()}
              </TableCell>
              <TableCell className="py-4 px-6">
                <Badge className="bg-[#8B5CF60D] text-sm rounded text-[#8B5CF6] border-[#8B5CF626] px-3 py-1">
                  {influencer.performanceScore}
                </Badge>
              </TableCell>
              <TableCell className="py-4 px-6">
                <div className="flex text-sm items-center gap-2">
                  <SurveysSVG />
                  <span className="text-foreground font-medium">
                    {influencer.completedSurveys}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-6 text-black text-sm">
                {influencer.lastUpdated}
              </TableCell>
              <TableCell className="py-4 px-6">
                <Button
                  variant="outline"
                  className="bg-white border-border hover:bg-muted text-foreground text-xs"
                  onClick={() => {
                    setSelectedInfluencer(influencer);
                    setDialogOpen(true);
                  }}
                >
                  Add to campaign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      <AddInfluencerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        influencerName={selectedInfluencer?.name || ""}
      />
    </div>
  );
};

export default InfluencersTable;
