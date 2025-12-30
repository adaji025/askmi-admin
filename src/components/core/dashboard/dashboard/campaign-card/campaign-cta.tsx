"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CampaignCTA() {
  const t = useTranslations("dashboard.cta");

  return (
    <div className="relative flex w-full flex-col items-start gap-4 rounded-xl border border-[#2563EB80] bg-[#f0f7ff] p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-4">
        {/* Overlapping bubble icon */}
        <Image
          src={"/images/svgs/campaign-filled.svg"}
          width={20}
          height={20}
          alt="No Active Campaigns"
        />

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-black">
            {t("title")}
          </h2>
          <div className="max-w-2xl space-y-1 text-sm text-slate-600">
            <p>
              {t("description1")}
            </p>
            <p>
              {t("description2")}
            </p>
          </div>
        </div>
      </div>
      <Link href="/dashboard/create-campaign">
        <Button className="mt-4 shrink-0 text-sm! rounded-md bg-[#2563eb] px-6 py-6 font-semibold hover:bg-[#1d4ed8] md:mt-0 md:self-end">
          <PlusCircle className="h-5 w-5" />
          {t("button")}
        </Button>
      </Link>
    </div>
  );
}
