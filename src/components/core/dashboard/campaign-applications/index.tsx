"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApproveCampaignApplication } from "@/features/campaign-applications/use-approve-campaign-application";
import { useGetCampaignApplications } from "@/features/campaign-applications/use-get-campaign-applications";
import { useConfirm } from "@/hooks/use-confirm";

const formatDate = (value: unknown) => {
  if (typeof value !== "string" || value.length === 0) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getDisplayValue = (...values: unknown[]) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
    if (typeof value === "number") {
      return String(value);
    }
  }
  return "-";
};

const CampaignApplications = () => {
  const [ConfirmDialog, confirm] = useConfirm();
  const { data = [], isPending, isError, error } = useGetCampaignApplications();
  const approveMutation = useApproveCampaignApplication();
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const handleApprove = async (applicationId: string) => {
    const accepted = await confirm(
      "Are you sure you want to approve this application?",
      "Approve application",
      {
        confirmLabel: "Approve",
        loadingLabel: "Approving...",
        onConfirm: async () => {
          setApprovingId(applicationId);
          try {
            await approveMutation.mutateAsync(applicationId);
          } finally {
            setApprovingId(null);
          }
        },
      },
    );

    if (!accepted) return;
  };

  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <div>
        <h1 className="text-2xl font-bold text-foreground">Campaign Applications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review all incoming campaign applications.
        </p>
      </div>

      <div className="rounded-lg border border-[#E2E8F0] bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
              <TableHead>Application ID</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Influencer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied At</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending &&
              Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={`application-skeleton-${index}`}>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))}

            {!isPending && isError && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-destructive">
                  {error?.message ?? "Failed to load campaign applications"}
                </TableCell>
              </TableRow>
            )}

            {!isPending && !isError && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No campaign applications found.
                </TableCell>
              </TableRow>
            )}

            {!isPending &&
              !isError &&
              data.map((item, index) => (
                <TableRow key={String(item.id ?? index)} className="hover:bg-muted/40">
                  {(() => {
                    const applicationId = getDisplayValue(item.id, item.applicationId);
                    const statusValue = String(getDisplayValue(item.status)).toLowerCase();
                    const isApproved = statusValue === "approved";
                    const isApproving =
                      approvingId !== null &&
                      applicationId !== "-" &&
                      approvingId === applicationId;
                    return (
                      <>
                  <TableCell>
                    {getDisplayValue(item.id, item.applicationId)}
                  </TableCell>
                  <TableCell>
                    {getDisplayValue(item.campaignName, item.campaignTitle, item.campaignId)}
                  </TableCell>
                  <TableCell>
                    {getDisplayValue(item.influencerName, item.fullName, item.userName, item.email)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {getDisplayValue(item.status)}
                  </TableCell>
                  <TableCell>
                    {formatDate(item.appliedAt ?? item.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (applicationId === "-") return;
                        void handleApprove(applicationId);
                      }}
                      disabled={applicationId === "-" || isApproved || approveMutation.isPending}
                    >
                      {isApproving ? "Approving..." : "Approve"}
                    </Button>
                  </TableCell>
                      </>
                    );
                  })()}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignApplications;
