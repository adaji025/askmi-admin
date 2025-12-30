import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import enCommon from "@/messages/en/common.json";
import enAuth from "@/messages/en/auth/index.json";
import enLanguage from "@/messages/en/language.json";
import enProfile from "@/messages/en/profile.json";
import enCampaign from "@/messages/en/campaign.json";
import enSurvey from "@/messages/en/survey.json";
import enDashboard from "@/messages/en/dashboard/index.json";
import { routing } from "@/i18n/routing";

const enMessages = {
  common: enCommon,
  auth: enAuth,
  language: enLanguage,
  profile: enProfile,
  campaign: enCampaign,
  survey: enSurvey,
  dashboard: enDashboard,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AskMi",
  description: "Connecting Brands with Influencers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get default locale messages
  const locale = routing.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <LanguageProvider locale={locale} messages={enMessages}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
