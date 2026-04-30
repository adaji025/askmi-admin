"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetBudgetConfig, useSaveBudgetConfig } from "@/features/budget/use-budget-config";

const ConfigPage = () => {
  const { data, isPending, isError, error, refetch } = useGetBudgetConfig();
  const saveMutation = useSaveBudgetConfig();
  const [pricePerUnitVote, setPricePerUnitVote] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (typeof data?.pricePerUnitVote === "number") {
      setPricePerUnitVote(String(data.pricePerUnitVote));
    }
  }, [data?.pricePerUnitVote]);

  const hasExistingConfig = typeof data?.pricePerUnitVote === "number";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = Number(pricePerUnitVote);

    if (!Number.isFinite(parsed) || parsed < 0) {
      setFeedback("Enter a valid non-negative number.");
      return;
    }

    try {
      setFeedback(null);
      await saveMutation.mutateAsync({
        pricePerUnitVote: parsed,
        hasExistingConfig,
      });
      setFeedback("Price per vote saved successfully.");
    } catch (mutationError) {
      setFeedback(
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to save price per vote.",
      );
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Budget Configuration</CardTitle>
          <CardDescription>
            Set or update the price per vote used in campaign budget calculations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="text-sm text-muted-foreground">Loading configuration...</div>
          ) : isError ? (
            <div className="space-y-3">
              <p className="text-sm text-destructive">
                {error?.message ?? "Failed to load configuration."}
              </p>
              <Button type="button" variant="outline" onClick={() => void refetch()}>
                Retry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="price-per-vote" className="text-sm font-medium">
                  Price per vote
                </label>
                <Input
                  id="price-per-vote"
                  type="number"
                  min={0}
                  step="0.01"
                  value={pricePerUnitVote}
                  onChange={(event) => setPricePerUnitVote(event.target.value)}
                  placeholder="0.75"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending
                    ? hasExistingConfig
                      ? "Updating..."
                      : "Saving..."
                    : hasExistingConfig
                      ? "Update price"
                      : "Set price"}
                </Button>
                {typeof data?.pricePerUnitVote === "number" && (
                  <span className="text-sm text-muted-foreground">
                    Current: {data.pricePerUnitVote}
                  </span>
                )}
              </div>
              {feedback && (
                <p className="text-sm text-muted-foreground">{feedback}</p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigPage;
