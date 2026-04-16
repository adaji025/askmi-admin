"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { AdminInfluencer } from "@/features/influencers/use-get-influencers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Influencer {
  id: string;
  name: string;
  username: string;
  isApproved: boolean;
  status: "active" | "pending" | "suspended";
  totalCampaigns: number;
  avgVotesDelivered: number;
  performanceScore: number;
  deviationTrend: number; // percentage
  ocrAccuracy: number; // percentage
}

type StatusFilter = "all" | "active" | "pending" | "suspended";

type InfluencersTableProps = {
  influencers?: AdminInfluencer[];
  isLoading?: boolean;
  onApprove?: (influencerId: string) => void | Promise<void>;
};

const InfluencersTable = ({
  influencers = [],
  isLoading = false,
  onApprove,
}: InfluencersTableProps) => {
  const t = useTranslations("influencers.table");
  const tFilters = useTranslations("influencers.filters");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [jumpToPage, setJumpToPage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const normalizeStatus = (value: unknown): Influencer["status"] => {
    const parsed = typeof value === "string" ? value.toLowerCase() : "";
    if (parsed === "pending" || parsed === "suspended") {
      return parsed;
    }
    return "active";
  };

  const mappedInfluencers = useMemo<Influencer[]>(() => {
    return influencers.map((item, index) => {
      const nameValue =
        item.name ?? item.fullName ?? item.displayName ?? item.userName;
      const name = typeof nameValue === "string" ? nameValue : `Influencer ${index + 1}`;
      const usernameValue = item.username ?? item.handle ?? item.userName;
      const username =
        typeof usernameValue === "string" && usernameValue.length > 0
          ? usernameValue
          : typeof item.email === "string" && item.email.includes("@")
            ? item.email.split("@")[0]
            : name.toLowerCase().replace(/\s+/g, "_");
      const id = typeof item.id === "string" ? item.id : String(item.id ?? index + 1);
      const statusValue =
        item.status ??
        item.accountStatus ??
        item.verificationStatus ??
        (item.isApproved === false ? "pending" : "active");
      const rawDeviation = item.deviationTrend;
      const deviationTrend =
        typeof rawDeviation === "number"
          ? rawDeviation
          : typeof rawDeviation === "string"
            ? rawDeviation.toLowerCase() === "up"
              ? 1
              : rawDeviation.toLowerCase() === "down"
                ? -1
                : 0
            : 0;

      return {
        id,
        name,
        username,
        isApproved: item.isApproved === true,
        status: normalizeStatus(statusValue),
        totalCampaigns: Number(item.totalCampaigns ?? item.totalCampaign ?? item.campaignsCount ?? 0),
        avgVotesDelivered: Number(item.avgVotesDelivered ?? item.averageVote ?? item.avgVotes ?? 0),
        performanceScore: Number(item.performanceScore ?? 0),
        deviationTrend,
        ocrAccuracy: Number(item.ocrAccuracy ?? 0),
      };
    });
  }, [influencers]);

  const counts = useMemo(() => {
    const base = { all: mappedInfluencers.length, active: 0, pending: 0, suspended: 0 };
    for (const influencer of mappedInfluencers) {
      base[influencer.status] += 1;
    }
    return base;
  }, [mappedInfluencers]);

  const statusOptions: Array<{
    value: StatusFilter;
    label: string;
    count: number;
  }> = [
      { value: "all", label: tFilters("all"), count: counts.all },
      { value: "active", label: tFilters("active"), count: counts.active },
      { value: "pending", label: tFilters("pending"), count: counts.pending },
      {
        value: "suspended",
        label: tFilters("suspended"),
        count: counts.suspended,
      },
    ];

  const getStatusBadgeClassName = (status: StatusFilter) => {
    if (status === "pending") {
      return "bg-[#FDF8E1] text-[#B7791F] border-[#F6E4B0]";
    }
    if (status === "suspended") {
      return "bg-[#FEECEC] text-[#C53030] border-[#F6C9C9]";
    }
    return "bg-[#EAF8EF] text-[#0F9F6E] border-[#BDE9D1]";
  };

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

  const filteredInfluencers = useMemo(() => {
    const lowered = searchQuery.trim().toLowerCase();
    return mappedInfluencers.filter((influencer) => {
      const matchesFilter =
        selectedFilter === "all" ? true : influencer.status === selectedFilter;
      const matchesSearch =
        lowered.length === 0
          ? true
          : influencer.name.toLowerCase().includes(lowered) ||
            influencer.username.toLowerCase().includes(lowered);
      return matchesFilter && matchesSearch;
    });
  }, [mappedInfluencers, searchQuery, selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredInfluencers.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedInfluencers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInfluencers.slice(start, start + pageSize);
  }, [currentPage, filteredInfluencers]);

  return (
    <div className="w-full mt-10 min-w-0 max-w-full overflow-x-hidden bg-white rounded-lg">
      {/* Top Section: Filters, Search, Sort */}
      <div className="flex flex-col gap-4 p-4 border-b border-[#E2E8F0]">
        {/* Filter Tabs */}
        <div className="flex overflow-x-auto gap-2 bg-[#F5F5F5] rounded-lg p-1">
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
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 h-10 bg-white border-border"
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

      {/* Table */}
      <div className="w-full max-w-full overflow-x-auto">
        <Table className="min-w-max">
          <TableHeader className="bg-[#FAFAFA] border-b border-[#E2E8F0]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("influencer")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("status")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("totalCampaigns")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("avgVotesDelivered")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("performanceScore")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("deviationTrend")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
                {t("ocrAccuracy")}
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground w-24">
                {/* Actions column */}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-4 w-14" /></TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-4 w-14" /></TableCell>
                  <TableCell className="py-4 px-6"><Skeleton className="h-6 w-6" /></TableCell>
                </TableRow>
              ))}
            {!isLoading &&
              paginatedInfluencers.map((influencer, index) => (
                <TableRow
                  key={influencer.id}
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
                    <button
                      type="button"
                      onClick={() => setSelectedFilter(influencer.status)}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-semibold capitalize transition-colors hover:opacity-90",
                        getStatusBadgeClassName(influencer.status)
                      )}
                    >
                      {tFilters(influencer.status)}
                    </button>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="text-sm text-foreground">
                      {influencer.totalCampaigns}
                    </span>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-sm border hover:bg-muted"
                          title="More actions"
                        >
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/influencers/${encodeURIComponent(influencer.id)}`}>
                            {t("view")}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onApprove?.(influencer.id)}
                          disabled={influencer?.isApproved}
                        >
                          Approve
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && paginatedInfluencers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-sm text-muted-foreground">
                  No influencers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 px-6">
        <div className="text-sm text-muted-foreground">
          {t("page")} {currentPage} {t("of")} {totalPages}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto max-w-full">
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
          <span className="text-sm text-muted-foreground">
            {t("jumpToPage")}
          </span>
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
