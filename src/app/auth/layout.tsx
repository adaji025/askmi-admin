"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = useTranslations("auth.layout");
  const { isRTL } = useLanguageStore();

  return (
    <div className="flex-1 h-screen overflow-y-auto py-10 px-6 lg:px-8">
      {children}
    </div>
  );
};

export default AuthLayout;
