"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import AudienceInterest from "./audience-interest";
import type {
  InstagramDemographics,
  InstagramDemographicSlice,
  InstagramPrimaryLocationSlice,
} from "@/features/influencers/use-get-influencers";
import { useUpdateInfluencerInstagramDemographics } from "@/features/influencers/use-update-influencer-instagram-demographics";

type EditableSection = "ageRange" | "language" | "gender" | "primaryLocation" | null;

interface DemographProps {
  influencerId?: string;
  instagramDemographics?: InstagramDemographics | null;
}

const DEFAULT_DEMOGRAPHICS: InstagramDemographics = {
  ageRange: [{ label: "25 - 34", percentage: 60 }],
  language: [{ label: "English", percentage: 80 }],
  gender: [{ label: "Female", percentage: 70 }],
  primaryLocation: [
    { countryCode: "CM", countryName: "Cameroon", percentage: 65 },
  ],
};

function hasInstagramDemographicsData(
  d: InstagramDemographics | null | undefined,
): boolean {
  if (!d) return false;
  return (
    (d.ageRange?.length ?? 0) > 0 ||
    (d.language?.length ?? 0) > 0 ||
    (d.gender?.length ?? 0) > 0 ||
    (d.primaryLocation?.length ?? 0) > 0
  );
}

function parsePercentage(value: string): number {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(100, Math.max(0, parsed));
}

function getInitialDemographics(
  incoming: InstagramDemographics | null | undefined,
): InstagramDemographics {
  if (hasInstagramDemographicsData(incoming)) {
    return {
      ageRange: incoming?.ageRange ?? [],
      language: incoming?.language ?? [],
      gender: incoming?.gender ?? [],
      primaryLocation: incoming?.primaryLocation ?? [],
    };
  }

  return {
    ageRange: DEFAULT_DEMOGRAPHICS.ageRange ?? [],
    language: DEFAULT_DEMOGRAPHICS.language ?? [],
    gender: DEFAULT_DEMOGRAPHICS.gender ?? [],
    primaryLocation: DEFAULT_DEMOGRAPHICS.primaryLocation ?? [],
  };
}

function EditableDistributionSection({
  title,
  items,
  isEditing,
  isSaving,
  editLabel,
  saveLabel,
  cancelLabel,
  addRowLabel,
  removeLabel,
  labelPlaceholder,
  percentagePlaceholder,
  onEdit,
  onCancel,
  onSave,
  onAddRow,
  onUpdateRow,
  onRemoveRow,
}: {
  title: string;
  items: InstagramDemographicSlice[];
  isEditing: boolean;
  isSaving: boolean;
  editLabel: string;
  saveLabel: string;
  cancelLabel: string;
  addRowLabel: string;
  removeLabel: string;
  labelPlaceholder: string;
  percentagePlaceholder: string;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onAddRow: () => void;
  onUpdateRow: (
    index: number,
    key: keyof InstagramDemographicSlice,
    value: string | number,
  ) => void;
  onRemoveRow: (index: number) => void;
}) {
  if (!items.length && !isEditing) return null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{title}</Label>

      {isEditing ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${title}-${index}`} className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-7"
                value={item.label}
                placeholder={labelPlaceholder}
                disabled={isSaving}
                onChange={(e) => onUpdateRow(index, "label", e.target.value)}
              />
              <Input
                type="number"
                min={0}
                max={100}
                className="col-span-3"
                value={String(item.percentage)}
                placeholder={percentagePlaceholder}
                disabled={isSaving}
                onChange={(e) => onUpdateRow(index, "percentage", e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="col-span-2 h-9"
                disabled={isSaving}
                onClick={() => onRemoveRow(index)}
              >
                {removeLabel}
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2 justify-end">
            <Button type="button" variant="outline" size="sm" disabled={isSaving} onClick={onAddRow}>
              {addRowLabel}
            </Button>
            <Button type="button" variant="outline" size="sm" disabled={isSaving} onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button type="button" size="sm" disabled={isSaving} onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <div className="flex items-center justify-between gap-2 text-sm text-foreground mb-1">
                  <span className="truncate">{item.label}</span>
                  <span className="tabular-nums text-muted-foreground shrink-0">
                    {item.percentage}%
                  </span>
                </div>
                <Progress value={Math.min(100, Math.max(0, item.percentage))} />
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" className="h-8 px-3" disabled={isSaving} onClick={onEdit}>
              {editLabel}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function EditablePrimaryLocationSection({
  title,
  items,
  isEditing,
  isSaving,
  editLabel,
  saveLabel,
  cancelLabel,
  addRowLabel,
  removeLabel,
  countryCodePlaceholder,
  countryNamePlaceholder,
  percentagePlaceholder,
  onEdit,
  onCancel,
  onSave,
  onAddRow,
  onUpdateRow,
  onRemoveRow,
}: {
  title: string;
  items: InstagramPrimaryLocationSlice[];
  isEditing: boolean;
  isSaving: boolean;
  editLabel: string;
  saveLabel: string;
  cancelLabel: string;
  addRowLabel: string;
  removeLabel: string;
  countryCodePlaceholder: string;
  countryNamePlaceholder: string;
  percentagePlaceholder: string;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onAddRow: () => void;
  onUpdateRow: (
    index: number,
    key: keyof InstagramPrimaryLocationSlice,
    value: string | number,
  ) => void;
  onRemoveRow: (index: number) => void;
}) {
  if (!items.length && !isEditing) return null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{title}</Label>

      {isEditing ? (
        <div className="space-y-3">
          {items.map((loc, index) => (
            <div key={`${title}-${index}`} className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-2"
                value={loc.countryCode ?? ""}
                placeholder={countryCodePlaceholder}
                disabled={isSaving}
                onChange={(e) => onUpdateRow(index, "countryCode", e.target.value.toUpperCase())}
              />
              <Input
                className="col-span-5"
                value={loc.countryName ?? ""}
                placeholder={countryNamePlaceholder}
                disabled={isSaving}
                onChange={(e) => onUpdateRow(index, "countryName", e.target.value)}
              />
              <Input
                type="number"
                min={0}
                max={100}
                className="col-span-3"
                value={String(loc.percentage)}
                placeholder={percentagePlaceholder}
                disabled={isSaving}
                onChange={(e) => onUpdateRow(index, "percentage", e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="col-span-2 h-9"
                disabled={isSaving}
                onClick={() => onRemoveRow(index)}
              >
                {removeLabel}
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2 justify-end">
            <Button type="button" variant="outline" size="sm" disabled={isSaving} onClick={onAddRow}>
              {addRowLabel}
            </Button>
            <Button type="button" variant="outline" size="sm" disabled={isSaving} onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button type="button" size="sm" disabled={isSaving} onClick={onSave}>
              {saveLabel}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((loc, index) => {
              const locationLabel =
                loc.countryName && loc.countryCode
                  ? `${loc.countryName} (${loc.countryCode})`
                  : loc.countryName ?? loc.countryCode ?? "-";

              return (
                <li key={`${locationLabel}-${index}`}>
                  <div className="flex items-center justify-between gap-2 text-sm text-foreground mb-1">
                    <span className="truncate">{locationLabel}</span>
                    <span className="tabular-nums text-muted-foreground shrink-0">
                      {loc.percentage}%
                    </span>
                  </div>
                  <Progress value={Math.min(100, Math.max(0, loc.percentage))} />
                </li>
              );
            })}
          </ul>
          <div className="flex justify-end">
            <Button type="button" variant="outline" size="sm" className="h-8 px-3" disabled={isSaving} onClick={onEdit}>
              {editLabel}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

const Demograph = ({ influencerId, instagramDemographics }: DemographProps) => {
  const t = useTranslations("influencers.demographics");

  const [performanceStats] = useState({
    averageVotes: 2843,
    performanceScore: 58,
    voteAccuracy: 96.5,
  });

  const [editingSection, setEditingSection] = useState<EditableSection>(null);
  const [draftDemographics, setDraftDemographics] = useState<InstagramDemographics>(
    getInitialDemographics(instagramDemographics),
  );
  const [snapshot, setSnapshot] = useState<InstagramDemographics | null>(null);
  const updateDemographicsMutation = useUpdateInfluencerInstagramDemographics();

  useEffect(() => {
    setDraftDemographics(getInitialDemographics(instagramDemographics));
  }, [instagramDemographics]);

  const getStatusBadge = (_value: number, type: "votes" | "score" | "accuracy") => {
    if (type === "votes") {
      return (
        <Badge className="bg-[#10B981] rounded min-w-20 text-white border-0 py-1.5">
          {t("excellent")}
        </Badge>
      );
    }
    if (type === "score") {
      return (
        <Badge className="bg-[#EDAE40] text-white border-0 rounded min-w-20 py-1.5">
          {t("okay")}
        </Badge>
      );
    }
    return (
      <Badge className="bg-[#10B981] text-white border-0 rounded min-w-20 py-1.5">
        {t("verified")}
      </Badge>
    );
  };

  const startEditing = (section: EditableSection) => {
    setSnapshot(structuredClone(draftDemographics));
    setEditingSection(section);
  };

  const cancelEditing = () => {
    if (snapshot) {
      setDraftDemographics(snapshot);
    }
    setEditingSection(null);
    setSnapshot(null);
  };

  const normalizeDistributionRows = (rows: InstagramDemographicSlice[]) =>
    rows
      .map((row) => ({
        label: row.label.trim(),
        percentage: parsePercentage(String(row.percentage)),
      }))
      .filter((row) => row.label.length > 0);

  const normalizeLocationRows = (rows: InstagramPrimaryLocationSlice[]) =>
    rows
      .map((row) => ({
        countryCode: (row.countryCode ?? "").trim().toUpperCase(),
        countryName: (row.countryName ?? "").trim(),
        percentage: parsePercentage(String(row.percentage)),
      }))
      .filter((row) => row.countryCode.length > 0 || row.countryName.length > 0);

  const saveEditing = async (section: Exclude<EditableSection, null>) => {
    if (!influencerId) {
      toast.error("Influencer ID is missing.");
      return;
    }

    try {
      if (section === "primaryLocation") {
        const payload = {
          primaryLocation: normalizeLocationRows(draftDemographics.primaryLocation ?? []),
        };
        await updateDemographicsMutation.mutateAsync({
          influencerId,
          instagramDemographics: payload,
        });
      } else {
        const payload = {
          [section]: normalizeDistributionRows(draftDemographics[section] ?? []),
        } as Pick<InstagramDemographics, "ageRange" | "language" | "gender">;

        await updateDemographicsMutation.mutateAsync({
          influencerId,
          instagramDemographics: payload,
        });
      }

      toast.success(t("updateSuccess"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("updateError"),
      );
      return;
    }

    setEditingSection(null);
    setSnapshot(null);
  };

  const updateDistribution = (
    key: "ageRange" | "language" | "gender",
    index: number,
    field: keyof InstagramDemographicSlice,
    value: string | number,
  ) => {
    setDraftDemographics((prev) => {
      const nextItems = [...(prev[key] ?? [])];
      const current = nextItems[index] ?? { label: "", percentage: 0 };
      nextItems[index] = {
        ...current,
        [field]:
          field === "percentage"
            ? parsePercentage(String(value))
            : String(value),
      };
      return { ...prev, [key]: nextItems };
    });
  };

  const addDistributionRow = (key: "ageRange" | "language" | "gender") => {
    setDraftDemographics((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), { label: "", percentage: 0 }],
    }));
  };

  const removeDistributionRow = (key: "ageRange" | "language" | "gender", index: number) => {
    setDraftDemographics((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateLocation = (
    index: number,
    field: keyof InstagramPrimaryLocationSlice,
    value: string | number,
  ) => {
    setDraftDemographics((prev) => {
      const nextItems = [...(prev.primaryLocation ?? [])];
      const current = nextItems[index] ?? { countryCode: "", countryName: "", percentage: 0 };
      nextItems[index] = {
        ...current,
        [field]:
          field === "percentage"
            ? parsePercentage(String(value))
            : String(value),
      };
      return { ...prev, primaryLocation: nextItems };
    });
  };

  const addLocationRow = () => {
    setDraftDemographics((prev) => ({
      ...prev,
      primaryLocation: [
        ...(prev.primaryLocation ?? []),
        { countryCode: "", countryName: "", percentage: 0 },
      ],
    }));
  };

  const removeLocationRow = (index: number) => {
    setDraftDemographics((prev) => ({
      ...prev,
      primaryLocation: (prev.primaryLocation ?? []).filter((_, i) => i !== index),
    }));
  };

  const showApiDemographics = hasInstagramDemographicsData(draftDemographics);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground">{t("demographics")}</h3>
          {showApiDemographics && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("instagramAudienceInsights")}
            </p>
          )}
        </div>

        {showApiDemographics ? (
          <div className="space-y-6">
            <EditableDistributionSection
              title={t("ageRange")}
              items={draftDemographics.ageRange ?? []}
              isEditing={editingSection === "ageRange"}
              isSaving={updateDemographicsMutation.isPending}
              editLabel={t("edit")}
              saveLabel={t("save")}
              cancelLabel={t("cancel")}
              addRowLabel={t("addRow")}
              removeLabel={t("remove")}
              labelPlaceholder={t("labelPlaceholder")}
              percentagePlaceholder={t("percentagePlaceholder")}
              onEdit={() => startEditing("ageRange")}
              onCancel={cancelEditing}
              onSave={() => {
                void saveEditing("ageRange");
              }}
              onAddRow={() => addDistributionRow("ageRange")}
              onUpdateRow={(index, field, value) =>
                updateDistribution("ageRange", index, field, value)
              }
              onRemoveRow={(index) => removeDistributionRow("ageRange", index)}
            />

            <EditableDistributionSection
              title={t("language")}
              items={draftDemographics.language ?? []}
              isEditing={editingSection === "language"}
              isSaving={updateDemographicsMutation.isPending}
              editLabel={t("edit")}
              saveLabel={t("save")}
              cancelLabel={t("cancel")}
              addRowLabel={t("addRow")}
              removeLabel={t("remove")}
              labelPlaceholder={t("labelPlaceholder")}
              percentagePlaceholder={t("percentagePlaceholder")}
              onEdit={() => startEditing("language")}
              onCancel={cancelEditing}
              onSave={() => {
                void saveEditing("language");
              }}
              onAddRow={() => addDistributionRow("language")}
              onUpdateRow={(index, field, value) =>
                updateDistribution("language", index, field, value)
              }
              onRemoveRow={(index) => removeDistributionRow("language", index)}
            />

            <EditableDistributionSection
              title={t("gender")}
              items={draftDemographics.gender ?? []}
              isEditing={editingSection === "gender"}
              isSaving={updateDemographicsMutation.isPending}
              editLabel={t("edit")}
              saveLabel={t("save")}
              cancelLabel={t("cancel")}
              addRowLabel={t("addRow")}
              removeLabel={t("remove")}
              labelPlaceholder={t("labelPlaceholder")}
              percentagePlaceholder={t("percentagePlaceholder")}
              onEdit={() => startEditing("gender")}
              onCancel={cancelEditing}
              onSave={() => {
                void saveEditing("gender");
              }}
              onAddRow={() => addDistributionRow("gender")}
              onUpdateRow={(index, field, value) =>
                updateDistribution("gender", index, field, value)
              }
              onRemoveRow={(index) => removeDistributionRow("gender", index)}
            />

            <EditablePrimaryLocationSection
              title={t("primaryLocation")}
              items={draftDemographics.primaryLocation ?? []}
              isEditing={editingSection === "primaryLocation"}
              isSaving={updateDemographicsMutation.isPending}
              editLabel={t("edit")}
              saveLabel={t("save")}
              cancelLabel={t("cancel")}
              addRowLabel={t("addRow")}
              removeLabel={t("remove")}
              countryCodePlaceholder={t("countryCode")}
              countryNamePlaceholder={t("countryName")}
              percentagePlaceholder={t("percentagePlaceholder")}
              onEdit={() => startEditing("primaryLocation")}
              onCancel={cancelEditing}
              onSave={() => {
                void saveEditing("primaryLocation");
              }}
              onAddRow={addLocationRow}
              onUpdateRow={updateLocation}
              onRemoveRow={removeLocationRow}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("noInstagramDemographics")}</p>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <h3 className="text-lg font-bold text-foreground mb-6">{t("performanceStatistics")}</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground mb-1 block">{t("averageVotes")}</Label>
              <p className="text-2xl font-bold text-foreground">
                {performanceStats.averageVotes.toLocaleString()}
              </p>
            </div>
            {getStatusBadge(performanceStats.averageVotes, "votes")}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground mb-1 block">
                {t("performanceScore")}
              </Label>
              <p className="text-2xl font-bold text-foreground">{performanceStats.performanceScore}%</p>
            </div>
            {getStatusBadge(performanceStats.performanceScore, "score")}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-muted-foreground mb-1 block">{t("voteAccuracy")}</Label>
              <p className="text-2xl font-bold text-foreground">{performanceStats.voteAccuracy}%</p>
            </div>
            {getStatusBadge(performanceStats.voteAccuracy, "accuracy")}
          </div>
        </div>
      </div>

      <AudienceInterest />
    </div>
  );
};

export default Demograph;
