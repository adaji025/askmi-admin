"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetCampaign } from "@/features/campaigns/use-get-campaign";

export default function CampaignDetail() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { data: campaign, isPending, isError, error } = useGetCampaign(id);
  const t = useTranslations("campaign.detail");

  const delivered = Number(campaign?.deliveredVote ?? campaign?.response ?? 0);
  const targetVotes = Number(campaign?.targetVotes ?? campaign?.totalVoteNeeded ?? 0);
  const progress = targetVotes > 0 ? Math.min((delivered / targetVotes) * 100, 100) : 0;
  const completionPercentage = `${Math.round(progress)}%`;
  const responsesCount = Number(campaign?.response ?? campaign?.deliveredVote ?? 0);
  const estimatedPrice = Number(campaign?.estimatedPrice ?? 0);
  const influencers = campaign?.influencers ?? [];
  const allQuestions =
    campaign?.surveys?.flatMap((survey) =>
      (survey.questions ?? []).map((question) => ({
        ...question,
        surveyTitle: survey.title,
      })),
    ) ?? [];

  if (isPending) {
    return <div className="py-8 text-sm text-muted-foreground">Loading campaign details...</div>;
  }

  if (isError) {
    return (
      <div className="py-8 text-sm text-destructive">
        {error?.message ?? "Failed to load campaign details"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <Badge
          variant="outline"
          className="bg-[#4AC3600D] rounded text-[#4AC360] border-[#4AC36026] font-medium px-2 py-1 uppercase text-[10px] tracking-wider"
        >
          {t("activeCampaign")}
        </Badge>
        <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-blck">
          {campaign?.campaignName ?? t("productFeedbackSurvey")}
        </h1>
        <p className="text-[#8A97A0] max-w-3xl leading-relaxed">
          {campaign?.description ?? t("collectingInsights")}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-emerald-100 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-emerald-950">
              {completionPercentage}
            </div>
            <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest mt-4">
              {t("complete")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-indigo-950">
              {responsesCount.toLocaleString()}
            </div>
            <div className="text-[10px] font-semibold text-indigo-800 uppercase tracking-widest mt-4">
              {t("responses")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-950">
              {Number(campaign?.numberOfInfluencer ?? 0)}
            </div>
            <div className="text-[10px] font-semibold text-blue-800 uppercase tracking-widest mt-4">
              {t("influencers")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-950">7 days</div>
            <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-widest mt-4">
              {t("left")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Progress */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-black">{t("responseProgress")}</h2>
          <div className="text-3xl font-bold">
            {delivered.toLocaleString()}{" "}
            <span className="text-gray-400 font-bold text-lg">/ {targetVotes.toLocaleString()}</span>
          </div>
        </div>
        <Progress value={progress} className="h-4 bg-gray-100" />
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#E5F7E8] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              {t("completeUppercase")}
            </div>
            <div className="text-2xl font-bold text-foreground">
              {completionPercentage}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#E7F2FD] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              {t("influencersUppercase")}
            </div>
            <div className="text-2xl font-bold text-foreground">4</div>
          </CardContent>
        </Card>
        <Card className="bg-[#FDF8E1] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              {t("leftUppercase")}
            </div>
            <div className="text-2xl font-bold text-foreground">7 days</div>
          </CardContent>
        </Card>
        <Card className="bg-[#E7F2FD] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              ESTIMATED PRICE
            </div>
            <div className="text-2xl font-bold text-foreground">
              ${estimatedPrice.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Survey Questions */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] space-y-4">
        <h2 className="text-lg font-bold text-foreground p-5 border-b">Survey Questions</h2>
        {allQuestions.length === 0 ? (
          <div className="p-5 text-sm text-muted-foreground">No survey questions available.</div>
        ) : (
          <div className="space-y-3 p-5">
            {allQuestions.map((question, index) => (
              <div key={question.id} className="rounded-md border border-[#E2E8F0] p-4">
                <div className="text-xs text-muted-foreground mb-1">
                  {question.surveyTitle} - Q{question.order ?? index + 1}
                </div>
                <div className="font-medium text-sm text-foreground">{question.title}</div>
                <div className="text-xs text-muted-foreground mt-1 capitalize">
                  Type: {question.type}
                </div>
                {question.options && question.options.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs text-muted-foreground space-y-1">
                    {question.options.map((option) => (
                      <li key={`${question.id}-${option.id}`}>{option.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Influencer Performance */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] space-y-4">
        <h2 className="text-lg font-bold text-foreground p-5">
          {t("influencerPerformance")}
        </h2>
        {influencers.length === 0 ? (
          <div className="px-5 pb-5 text-sm text-muted-foreground">
            No influencers assigned to this campaign yet.
          </div>
        ) : (
          <div className="space-y-4">
            {influencers.map((influencer, index) => {
              const name = influencer.fullName ?? "Unknown Influencer";
              const handle =
                typeof influencer.email === "string" && influencer.email.length > 0
                  ? `@${influencer.email.split("@")[0]}`
                  : "@unknown";
              const initials = name
                .split(" ")
                .filter(Boolean)
                .map((part) => part[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={`${influencer.email ?? name}-${index}`}
                  className="flex flex-col md:flex-row md:justify-between md:items-center border-b gap-4 p-4 hover:bg-[#FAFAFA] transition-colors"
                >
                  <div className="flex">
                    <Avatar className="h-12 w-12 bg-[#8B5CF6]">
                      <AvatarFallback className="bg-[#8B5CF6] text-white text-sm font-bold">
                        {initials || "IN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold text-foreground">{name}</div>
                      <div className="text-sm text-muted-foreground">{handle}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <span className="text-sm font-medium text-foreground">
                      {Number(influencer.responses ?? 0).toLocaleString()} {t("responsesLabel")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
