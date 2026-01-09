"use client";

import React, { useState } from "react";
import { Check, Edit2, Save, X, Key, Mail, Building2, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BrandDetailProps {
  brandId: string;
}

interface Campaign {
  id: number;
  name: string;
  status: "active" | "lagging" | "completed";
  targetVotes: number;
  delivered: number;
  progress: number;
  startDate: string;
  endDate: string;
}

const BrandDetail: React.FC<BrandDetailProps> = ({ brandId }) => {
  const t = useTranslations("brands.detail");
  const [isEditing, setIsEditing] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [brandData, setBrandData] = useState({
    name: "TechCo Limited",
    email: "contact@techco.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, San Francisco, CA 94105",
    website: "https://techco.com",
    companySize: "50-200",
    industry: "Technology",
  });

  const [editedData, setEditedData] = useState(brandData);

  // Mock active campaigns
  const activeCampaigns: Campaign[] = [
    {
      id: 1,
      name: "TechCo Market Research Q4",
      status: "active",
      targetVotes: 10000,
      delivered: 6549,
      progress: 65.49,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
    },
    {
      id: 2,
      name: "Product Feedback Survey",
      status: "active",
      targetVotes: 5000,
      delivered: 3200,
      progress: 64,
      startDate: "2024-01-20",
      endDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Customer Satisfaction Study",
      status: "lagging",
      targetVotes: 8000,
      delivered: 4200,
      progress: 52.5,
      startDate: "2024-01-10",
      endDate: "2024-02-10",
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(brandData);
  };

  const handleSave = () => {
    setBrandData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(brandData);
    setIsEditing(false);
  };

  const handleResetPassword = () => {
    // In production, this would call an API
    console.log("Resetting password for brand:", brandId);
    setIsResetPasswordOpen(false);
    // Show success message
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-[#2AC670] text-white border-0">
            {t("active")}
          </Badge>
        );
      case "lagging":
        return (
          <Badge className="bg-[#EDAE40] text-white border-0">
            {t("lagging")}
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-[#2563EB] text-white border-0">
            {t("completed")}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-lg bg-[#2563EB]">
                <AvatarFallback className="bg-[#2563EB] text-white text-xl font-bold">
                  {getInitials(brandData.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {brandData.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {brandData.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleEdit}
                    className="h-10 border-[#E2E8F0]"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {t("edit")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsResetPasswordOpen(true)}
                    className="h-10 border-[#E2E8F0]"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    {t("resetPassword")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="h-10 border-[#E2E8F0]"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="h-10 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t("save")}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Brand Information Section */}
        <div className="bg-white rounded-lg border border-[#E2E8F0]">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-foreground">
              {t("brandInformation")}
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("companyName")}
              </label>
              {isEditing ? (
                <Input
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="h-10"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {brandData.name}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("emailAddress")}
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                  className="h-10"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {brandData.email}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("phoneNumber")}
              </label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                  className="h-10"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {brandData.phone}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("website")}
              </label>
              {isEditing ? (
                <Input
                  type="url"
                  value={editedData.website}
                  onChange={(e) =>
                    setEditedData({ ...editedData, website: e.target.value })
                  }
                  className="h-10"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={brandData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#2563EB] hover:underline"
                  >
                    {brandData.website}
                  </a>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("address")}
              </label>
              {isEditing ? (
                <Input
                  value={editedData.address}
                  onChange={(e) =>
                    setEditedData({ ...editedData, address: e.target.value })
                  }
                  className="h-10"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {brandData.address}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("companySize")}
              </label>
              <span className="text-sm font-medium text-foreground">
                {brandData.companySize}
              </span>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                {t("industry")}
              </label>
              <span className="text-sm font-medium text-foreground">
                {brandData.industry}
              </span>
            </div>
          </div>
        </div>

        {/* Active Campaigns Section */}
        <div className="bg-white rounded-lg border border-[#E2E8F0]">
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-foreground">
              {t("activeCampaigns")} ({activeCampaigns.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground">
                    {t("campaignName")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("status")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("progress")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("targetVotes")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("delivered")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("startDate")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("endDate")}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    {t("actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-muted/50">
                    <TableCell>
                      <span className="text-sm font-medium text-foreground">
                        {campaign.name}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-2 bg-[#F2F2F2] rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all",
                              campaign.status === "active"
                                ? "bg-[#2AC670]"
                                : campaign.status === "lagging"
                                ? "bg-[#EDAE40]"
                                : "bg-[#2563EB]"
                            )}
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {campaign.progress.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {campaign.targetVotes.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {campaign.delivered.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/campaigns/${campaign.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/10"
                        >
                          {t("view")}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("resetPassword")}</DialogTitle>
            <DialogDescription>
              {t("resetPasswordDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              {t("resetPasswordConfirmation", { email: brandData.email })}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResetPasswordOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleResetPassword}
              className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
            >
              {t("confirmReset")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BrandDetail;

