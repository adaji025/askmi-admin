"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguageStore } from "@/store/language-store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslations("language");
  const router = useRouter();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as "en" | "he");
    // Reload the page to apply language changes
    router.refresh();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="size-4" />
            <span className="hidden sm:inline">
              {language === "en" ? t("english") : t("hebrew")}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
            <DropdownMenuRadioItem value="en">{t("english")}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="he">{t("hebrew")}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageDropdown;
