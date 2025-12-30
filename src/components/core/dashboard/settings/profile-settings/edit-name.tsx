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

interface EditNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName?: string;
  onSave?: (name: string) => void;
}

export function EditNameDialog({
  open,
  onOpenChange,
  currentName = "Adaji Mukhtar",
  onSave,
}: EditNameDialogProps) {
  const [fullName, setFullName] = useState("");

  // Set email when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && currentName) {
      setFullName(currentName);
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (onSave && fullName) {
      onSave(fullName);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Full Name
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Update your full name
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full-name" className="text-sm text-muted-foreground">
              Full Name
            </Label>
            <Input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Sarah Smith"
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

export default EditNameDialog;
