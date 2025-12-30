"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CampaignsSVG } from "../dashboard/layout/svg";

interface Campaign {
  id: number;
  title: string;
  currentVotes: number;
  totalVotes: number;
  influencers: number;
  daysLeft: number;
}

interface AddInfluencerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  influencerName: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Product Feeback Survey",
    currentVotes: 15430,
    totalVotes: 50000,
    influencers: 2,
    daysLeft: 7,
  },
  {
    id: 2,
    title: "Brand Awareness Survey",
    currentVotes: 15430,
    totalVotes: 50000,
    influencers: 2,
    daysLeft: 7,
  },
  {
    id: 3,
    title: "Customer Satisfaction Survey",
    currentVotes: 15430,
    totalVotes: 50000,
    influencers: 2,
    daysLeft: 7,
  },
  {
    id: 4,
    title: "Customer Satisfaction Survey",
    currentVotes: 15430,
    totalVotes: 50000,
    influencers: 2,
    daysLeft: 7,
  },
];

export function AddInfluencerDialog({
  open,
  onOpenChange,
  influencerName,
}: AddInfluencerDialogProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedCampaign) {
      // Handle continue action
      console.log("Adding to campaign:", selectedCampaign);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-130 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Select Campaign
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground">
            Choose which campaign to add{" "}
            <span className="font-bold text-[#2563EB]">{influencerName}</span>{" "}
            to
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-2 overflow-y-auto max-h-87.5">
            <h3 className="font-bold mb-2 text-sm">Active Campaigns</h3>
            <div className="space-y-3">
              {mockCampaigns.map((campaign) => (
                <button
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-2 rounded-lg border text-left transition-all",
                    selectedCampaign === campaign.id
                      ? "border-[#2563EB] bg-[#2563EB]/5"
                      : "border-[#E2E8F0] bg-white hover:border-[#2563EB]/50"
                  )}
                >
                  <CampaignsSVG />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-foreground mb-1">
                      {campaign.title}
                    </h4>
                    <div className="flex text-[10px] items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {campaign.currentVotes.toLocaleString()} /{" "}
                        {campaign.totalVotes.toLocaleString()} votes
                      </span>
                      <span>•</span>
                      <span>{campaign.influencers} influencers</span>
                      <span>•</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <Button
            onClick={handleContinue}
            disabled={!selectedCampaign}
            className="px-8 h-12 w-full text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddInfluencerDialog;
