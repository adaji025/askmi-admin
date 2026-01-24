"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

interface EditAIGeneratedTextProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialText?: string;
  onSave?: (text: string) => void;
  onCancel?: () => void;
}

const EditAigeneratedText: React.FC<EditAIGeneratedTextProps> = ({
  open,
  onOpenChange,
  initialText = "Sarah Johnson is an influencer that mostly has a following of fashion and tech heads.\nShe has done well in recent campaigns with successful polls",
  onSave,
  onCancel,
}) => {
  const t = useTranslations("influencers.nicheAnalysis");
  const [text, setText] = useState(initialText);

  // Update text when initialText changes
  React.useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSave = () => {
    if (onSave) {
      onSave(text);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to initial text
    setText(initialText);
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground mt-2">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-50 w-full resize-none text-sm border-[#E2E8F0] bg-white text-foreground"
            placeholder={t("placeholder")}
          />
        </div>

        <DialogFooter className="flex-row justify-end gap-3 sm:justify-end mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="h-10 px-6 bg-white border-[#E2E8F0] text-foreground hover:bg-[#F5F5F5]"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSave}
            className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          >
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAigeneratedText;
