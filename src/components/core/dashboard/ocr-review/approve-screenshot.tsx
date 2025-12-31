"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ApproveScreenshotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignName: string;
  screenshotUrl?: string;
  onApprove?: () => void;
  onCancel?: () => void;
}

const ApproveScreenshot: React.FC<ApproveScreenshotProps> = ({
  open,
  onOpenChange,
  campaignName,
  screenshotUrl = "/images/svgs/screenshot.svg",
  onApprove,
  onCancel,
}) => {
  const handleApprove = () => {
    if (onApprove) {
      onApprove();
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <div className="space-y-6">
          {/* Screenshot */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-50 aspect-2/3 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={screenshotUrl}
                alt="Screenshot"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Campaign Name */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">"{campaignName}"</p>
          </div>

          {/* Question */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">
              Approve this screenshot?
            </h3>
          </div>

          {/* Action Buttons */}
          <DialogFooter className="flex-row justify-center gap-3 sm:justify-center">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-10 px-6 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
            >
              Approve
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveScreenshot;
