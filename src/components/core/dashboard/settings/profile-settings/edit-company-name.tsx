"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditCompanyNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCompanyName?: string;
  onSave?: (companyName: string) => void;
}

export function EditCompanyNameDialog({
  open,
  onOpenChange,
  currentCompanyName = "Acme Corporation",
  onSave,
}: EditCompanyNameDialogProps) {
  const [companyName, setCompanyName] = useState("");

  // Set company name when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && currentCompanyName) {
      setCompanyName(currentCompanyName);
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (onSave && companyName) {
      onSave(companyName);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Company Name
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Update your company name
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="company-name" className="text-sm text-muted-foreground">
              Company Name
            </Label>
            <Input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corporation"
              className="h-10"
            />
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCompanyNameDialog;

