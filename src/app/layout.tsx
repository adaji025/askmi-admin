import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/language-provider";
import enCommon from "@/messages/en/common.json";
import enAuth from "@/messages/en/auth/index.json";
import enLanguage from "@/messages/en/language.json";
import enProfile from "@/messages/en/profile.json";
import enCampaign from "@/messages/en/campaign/index.json";
import enSurvey from "@/messages/en/survey.json";
import enDashboard from "@/messages/en/dashboard/index.json";
import enBrands from "@/messages/en/brands/index.json";
import enInfluencers from "@/messages/en/influencers/index.json";
import enOcrReview from "@/messages/en/ocr-review/index.json";
import { routing } from "@/i18n/routing";
import NextTopLoader from 'nextjs-toploader';

const enMessages = {
  common: enCommon,
  auth: enAuth,
  language: enLanguage,
  profile: enProfile,
  campaign: enCampaign,
  survey: enSurvey,
  dashboard: enDashboard,
  brands: enBrands,
  influencers: enInfluencers,
  "ocr-review": enOcrReview,
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
      <NextTopLoader />
        <LanguageProvider locale={locale} messages={enMessages}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
