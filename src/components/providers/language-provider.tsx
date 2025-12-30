"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { NextIntlClientProvider } from "next-intl";
import enCommon from "@/messages/en/common.json";
import enAuth from "@/messages/en/auth/index.json";
import enLanguage from "@/messages/en/language.json";
import enProfile from "@/messages/en/profile.json";
import enCampaign from "@/messages/en/campaign.json";
import enSurvey from "@/messages/en/survey.json";
import enDashboard from "@/messages/en/dashboard/index.json";
import heCommon from "@/messages/he/common.json";
import heAuth from "@/messages/he/auth/index.json";
import heLanguage from "@/messages/he/language.json";
import heProfile from "@/messages/he/profile.json";
import heCampaign from "@/messages/he/campaign.json";
import heSurvey from "@/messages/he/survey.json";
import heDashboard from "@/messages/he/dashboard/index.json";

const messagesMap = {
  en: {
    common: enCommon,
    auth: enAuth,
    language: enLanguage,
    profile: enProfile,
    campaign: enCampaign,
    survey: enSurvey,
    dashboard: enDashboard,
  },
  he: {
    common: heCommon,
    auth: heAuth,
    language: heLanguage,
    profile: heProfile,
    campaign: heCampaign,
    survey: heSurvey,
    dashboard: heDashboard,
  },
};

export function LanguageProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  const { language, setLanguage, isRTL } = useLanguageStore();
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    // Sync store with current locale on mount
    if (locale !== language) {
      setLanguage(locale as "en" | "he");
    }
  }, []);

  useEffect(() => {
    // Update messages and locale when language changes
    const newMessages = messagesMap[language as keyof typeof messagesMap] || messages;
    setCurrentMessages(newMessages);
    setCurrentLocale(language);
  }, [language, messages]);

  useEffect(() => {
    // Update HTML attributes when language changes
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  return (
    <NextIntlClientProvider locale={currentLocale} messages={currentMessages}>
      {children}
    </NextIntlClientProvider>
  );
}

