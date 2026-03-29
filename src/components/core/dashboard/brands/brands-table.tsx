"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { CampaignsSVG, BrandsSVG } from "../dashboard/layout/svg";
import type { AdminBrand } from "@/features/brands/types";

type StatusFilter = "all" | "flagged";

const PAGE_SIZE = 10;

interface BrandsTableProps {
  selectedFilter?: StatusFilter;
  brands?: AdminBrand[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry: () => void;
}

const BrandsTable = ({
  selectedFilter = "all",
  brands,
  isLoading,
  isError,
  error,
  onRetry,
}: BrandsTableProps) => {
  const t = useTranslations("brands.table");
  const tEmpty = useTranslations("brands.emptyStates");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");

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
      .toUpperCase()
      .slice(0, 2);
  };

  const formatSpend = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const list = brands ?? [];

  const filteredBrands = useMemo(() => {
    return list.filter((brand) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "flagged") return !brand.isApproved;
      return true;
    });
  }, [list, selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBrands.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, list.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedBrands = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBrands.slice(start, start + PAGE_SIZE);
  }, [filteredBrands, currentPage]);

  const isEmpty = !isLoading && !isError && filteredBrands.length === 0;

  const getEmptyStateMessage = () => {
    if (selectedFilter === "flagged") return tEmpty("noFlaggedBrands");
    return tEmpty("noBrands");
  };

  return (
    <div className="w-full mt-4 max-w-[calc(100vw-300px)] 2xl:max-w-[calc(100vw-280px)] min-w-0 bg-white rounded-lg border border-[#E2E8F0]">
      {/* Table */}
      <Table>
        <TableHeader className="bg-[#FAFAFA] border-b border-[#E2E8F0]">
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {t("brand")}
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {t("totalCampaigns")}
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {t("activeCampaigns")}
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {t("totalSpend")}
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {t("lastActivity")}
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground">
              {t("riskFlags")}
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground w-24">
              {/* Actions column */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError ? (
            <TableRow>
              <TableCell colSpan={8} className="py-16 px-6">
                <div className="flex flex-col items-center justify-center gap-3">
                  <p className="text-sm text-destructive">
                    {error?.message ?? "Failed to load brands"}
                  </p>
                  <Button type="button" variant="outline" size="sm" onClick={onRetry}>
                    Retry
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="py-16 px-6">
                <p className="text-center text-sm text-muted-foreground">
                  Loading brands…
                </p>
              </TableCell>
            </TableRow>
          ) : isEmpty ? (
            <TableRow>
              <TableCell colSpan={8} className="py-16 px-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 text-[#EF4444] [&_svg]:w-16 [&_svg]:h-16">
                    <BrandsSVG />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getEmptyStateMessage()}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paginatedBrands.map((brand) => {
              const lastActivity = formatDistanceToNow(new Date(brand.updatedAt), {
                addSuffix: true,
              });
              const riskLevel = brand.isApproved ? "none" : "low-ocr";

              return (
                <TableRow key={brand.id} className="hover:bg-muted/50">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full shrink-0",
                            brand.isApproved
                              ? "bg-[#10B981]"
                              : "bg-[#F59E0B]"
                          )}
                        />
                        <Avatar className="h-10 w-10 rounded-md bg-[#2563EB]">
                          <AvatarFallback className="bg-[#2563EB] text-white text-xs font-semibold">
                            {getInitials(brand.fullName)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                          {brand.fullName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {brand.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="text-sm text-foreground">
                      {brand.totalCampaign}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <CampaignsSVG />
                      <span className="text-sm text-foreground">
                        {brand.activeCampaign}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="text-sm text-foreground">
                      {formatSpend(brand.totalSpend)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="text-sm text-foreground">
                      {lastActivity}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          riskLevel === "none"
                            ? "bg-[#10B981]"
                            : "bg-[#F59E0B]"
                        )}
                      />
                      <span className="text-sm text-foreground">
                        {riskLevel === "none" ? t("none") : t("lowOcr")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/brands/${brand.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-sm border hover:bg-muted"
                          title={t("view")}
                        >
                          <Eye className="h-2 w-2 text-muted-foreground" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination - Only show if not empty */}
      {!isEmpty && !isLoading && !isError && (
        <div className="flex items-center justify-between py-4 px-6 border-t border-[#E2E8F0] bg-[#FAFAFA]">
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
      )}
    </div>
  );
};

export default BrandsTable;
