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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Timezone {
  value: string;
  label: string;
}

const timezones: Timezone[] = [
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Jerusalem", label: "Israel Standard Time (IST)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
];

interface EditTimezoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTimezone?: string;
  onSave?: (timezone: string) => void;
}

export function EditTimezoneDialog({
  open,
  onOpenChange,
  currentTimezone = "Pacific Time (PT)",
  onSave,
}: EditTimezoneDialogProps) {
  // Find the timezone value from the label
  const getTimezoneValue = (label: string) => {
    return timezones.find((tz) => tz.label === label)?.value || "America/Los_Angeles";
  };

  const [selectedTimezone, setSelectedTimezone] = useState(getTimezoneValue(currentTimezone));

  // Set timezone when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && currentTimezone) {
      setSelectedTimezone(getTimezoneValue(currentTimezone));
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (onSave && selectedTimezone) {
      const timezoneLabel = timezones.find((tz) => tz.value === selectedTimezone)?.label || selectedTimezone;
      onSave(timezoneLabel);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Timezone
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Update your timezone
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-sm text-muted-foreground">
              Timezone
            </Label>
            <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
              <SelectTrigger id="timezone" className="h-12 w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default EditTimezoneDialog;

