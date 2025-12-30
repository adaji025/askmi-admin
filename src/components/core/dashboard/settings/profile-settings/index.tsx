"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditPhoneNumberDialog from "./edit-phone-number";
import EditEmailDialog from "./edit-email";
import EditNameDialog from "./edit-name";
import EditCompanyNameDialog from "./edit-company-name";
import EditTimezoneDialog from "./edit-timezone";
import ChangeLangDialog from "./change-lang";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/store/language-store";

export function ProfileSettings() {
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");
  const tLang = useTranslations("language");
  const { language } = useLanguageStore();
  const [openLangDialog, setOpenLangDialog] = useState(false);
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("+1 (555) 123-4567");
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("Sarahsmith@example.com");
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [currentName, setCurrentName] = useState("Sarah Smith");
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [currentCompanyName, setCurrentCompanyName] = useState("Acme Corporation");
  const [openTimezoneDialog, setOpenTimezoneDialog] = useState(false);
  const [currentTimezone, setCurrentTimezone] = useState("Pacific Time (PT)");

  return (
    <div className="space-y-6">
      <ChangeLangDialog
        open={openLangDialog}
        onOpenChange={setOpenLangDialog}
      />
      <EditPhoneNumberDialog
        open={openPhoneDialog}
        onOpenChange={setOpenPhoneDialog}
        currentPhoneNumber={currentPhoneNumber}
        onSave={(phoneNumber, countryCode) => {
          setCurrentPhoneNumber(`${countryCode} ${phoneNumber}`);
        }}
      />
      <EditEmailDialog
        open={openEmailDialog}
        onOpenChange={setOpenEmailDialog}
        currentEmail={currentEmail}
        onSave={(email) => {
          setCurrentEmail(email);
        }}
      />
      <EditNameDialog
        open={openNameDialog}
        onOpenChange={setOpenNameDialog}
        currentName={currentName}
        onSave={(name) => {
          setCurrentName(name);
        }}
      />
      <EditCompanyNameDialog
        open={openCompanyDialog}
        onOpenChange={setOpenCompanyDialog}
        currentCompanyName={currentCompanyName}
        onSave={(companyName) => {
          setCurrentCompanyName(companyName);
        }}
      />
      <EditTimezoneDialog
        open={openTimezoneDialog}
        onOpenChange={setOpenTimezoneDialog}
        currentTimezone={currentTimezone}
        onSave={(timezone) => {
          setCurrentTimezone(timezone);
        }}
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground">{t("myProfile")}</h2>
      </div>

      <Table>
        <TableBody>
          {/* Photo Section */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                {t("photo")}
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-linear-to-br from-purple-400 to-pink-400">
                  <AvatarFallback className="text-white font-semibold text-sm">
                    DR
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {t("photoDescription")}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  {tCommon("upload")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  {tCommon("delete")}
                </Button>
              </div>
            </TableCell>
          </TableRow>

          {/* Full name */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6 w-1/3">
              <span className="text-sm font-medium text-muted-foreground">
                {t("fullName")}
              </span>
            </TableCell>
            <TableCell className="py-6 w-1/3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {currentName}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {t("fullNameDescription")}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right w-1/3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenNameDialog(true)}
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                {tCommon("edit")}
              </Button>
            </TableCell>
          </TableRow>

          {/* Contact email */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                {t("contactEmail")}
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {currentEmail}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {t("contactEmailDescription")}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenEmailDialog(true)}
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                {tCommon("edit")}
              </Button>
            </TableCell>
          </TableRow>

          {/* Company */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                {t("company")}
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {currentCompanyName}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {t("companyDescription")}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenCompanyDialog(true)}
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                {tCommon("edit")}
              </Button>
            </TableCell>
          </TableRow>

          {/* Phone number */}
          <TableRow className="border-b-0">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                {t("phoneNumber")}
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {currentPhoneNumber}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {t("phoneNumberDescription")}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenPhoneDialog(true)}
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                {tCommon("edit")}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="space-y-6 pt-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">{t("preferences")}</h2>
        </div>

        <Table>
          <TableBody>
            {/* Language */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("language")}
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {language === "en" ? tLang("english") : tLang("hebrew")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {t("languageDescription")}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenLangDialog(true)}
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  {tCommon("change")}
                </Button>
              </TableCell>
            </TableRow>

            {/* Timezone */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("timezone")}
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {currentTimezone}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {t("timezoneDescription")}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenTimezoneDialog(true)}
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  {tCommon("change")}
                </Button>
              </TableCell>
            </TableRow>

            {/* Campaign updates */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("campaignUpdates")}
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  {t("campaignUpdatesDescription")}
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#2563EB]"
                />
              </TableCell>
            </TableRow>

            {/* Response alerts */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("responseAlerts")}
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  {t("responseAlertsDescription")}
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#2563EB]"
                />
              </TableCell>
            </TableRow>

            {/* Influencer activity */}
            <TableRow className="border-b-0">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("influencerActivity")}
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  {t("influencerActivityDescription")}
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch className="data-[state=checked]:bg-[#2563EB]" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
