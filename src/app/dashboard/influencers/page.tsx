"use client";

import { InfluencersSVG } from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import InfluencersTable from "@/components/core/dashboard/influencers/influencers-table";
import {
  HeartUserSVG,
  InboxSVG,
  ShieldUserSVG,
} from "@/components/core/dashboard/svg";
import { useApproveInfluencer } from "@/features/influencers/use-approve-inflencer";
import { useGetInfluencers } from "@/features/influencers/use-get-influencers";
import { useConfirm } from "@/hooks/use-confirm";
import { useTranslations } from "next-intl";

const Influencers = () => {
  const { data, isPending } = useGetInfluencers();
  const [ConfirmDialog, confirm] = useConfirm();
  const approveMutation = useApproveInfluencer();
  const t = useTranslations("influencers.stats");

  const statistics = data?.statistics;
  const influencers = data?.influencers ?? [];

  const handleApprove = async (influencerId: string) => {
    const accepted = await confirm("Are you sure you want to approve this influencer?", "Approve influencer", {
      confirmLabel: "Approve",
      loadingLabel: "Approving...",
      onConfirm: async () => {
        await approveMutation.mutateAsync(influencerId);
      },
    });

    if (!accepted) return;
  };

  const stats = [
    {
      title: t("totalInfluencers"),
      value: String(statistics?.totalInfluencers ?? influencers.length),
      icon: InfluencersSVG,
      bgColor: "bg-[#E7F2FD]", // Light Blue
    },
    {
      title: t("pendingApprovals"),
      value: String(statistics?.pendingApprovals ?? 0),
      icon: InboxSVG,
      bgColor: "bg-[#FDF8E1]", // Light Lavender
    },
    {
      title: t("flaggedForRisk"),
      value: String(statistics?.flaggedRisk ?? 0),
      icon: ShieldUserSVG,
      bgColor: "bg-[#EEEFFC]", // Light Blue
    },
    {
      title: t("topPerformers"),
      value: statistics?.topPerformer ? "1" : "0",
      icon: HeartUserSVG,
      bgColor: "bg-[#E5F7E8]", // Light Blue
    },
  ] as const;
  return (
    <div>
      <ConfirmDialog />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <InfluencersTable
        influencers={influencers}
        isLoading={isPending}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default Influencers;
