"use client";

import { useState } from "react";
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
import { CampaignsSVG, BrandsSVG } from "../dashboard/layout/svg";

type StatusFilter = "all" | "flagged";

interface Brand {
  id: number;
  name: string;
  email: string;
  status: "active" | "flagged"; // active = green, flagged = orange
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  lastActivity: string;
  riskLevel: "none" | "low-ocr"; // none = green, low-ocr = orange
}

const mockBrands: Brand[] = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: "TechCo Limited",
    email: "contact@techco.com",
    // Mix of statuses: some flagged, some active with different risk levels
    status: index === 2 || index === 5 ? "flagged" : "active",
    totalCampaigns: 23,
    activeCampaigns: 2,
    totalSpend: 4600,
    lastActivity: "2 days ago",
    // For approved: status active + riskLevel none
    // For pending: status active + riskLevel low-ocr
    // For flagged: status flagged
    riskLevel:
      index === 2 || index === 5
        ? "low-ocr"
        : index === 3 || index === 7
        ? "low-ocr"
        : "none",
  }));

interface BrandsTableProps {
  selectedFilter?: StatusFilter;
}

const BrandsTable = ({ selectedFilter = "all" }: BrandsTableProps) => {
  const t = useTranslations("brands.table");
  const tEmpty = useTranslations("brands.emptyStates");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter brands based on selected filter
  const filteredBrands = mockBrands.filter((brand) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "flagged") return brand.status === "flagged";
    return true;
  });

  const isEmpty = filteredBrands.length === 0;

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
          {isEmpty ? (
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
            filteredBrands.map((brand, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {/* Status indicator */}
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          brand.status === "active"
                            ? "bg-[#10B981]"
                            : "bg-[#F59E0B]"
                        )}
                      />
                      {/* Avatar */}
                      <Avatar className="h-10 w-10 rounded-md bg-[#2563EB]">
                        <AvatarFallback className="bg-[#2563EB] text-white text-xs font-semibold">
                          {getInitials(brand.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {brand.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {brand.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground">
                    {brand.totalCampaigns}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <CampaignsSVG />
                    <span className="text-sm text-foreground">
                      {brand.activeCampaigns}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground">
                    {formatCurrency(brand.totalSpend)}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground">
                    {brand.lastActivity}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        brand.riskLevel === "none"
                          ? "bg-[#10B981]"
                          : "bg-[#F59E0B]"
                      )}
                    />
                    <span className="text-sm text-foreground">
                      {brand.riskLevel === "none" ? t("none") : t("lowOcr")}
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
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination - Only show if not empty */}
      {!isEmpty && (
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
