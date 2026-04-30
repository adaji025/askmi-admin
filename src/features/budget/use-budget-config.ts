"use client";

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface BudgetConfig {
  pricePerUnitVote: number;
}

interface BudgetApiResponse {
  success?: boolean;
  message?: string;
  budget?: {
    pricePerUnitVote?: number;
  };
  pricePerUnitVote?: number;
}

export const budgetConfigQueryKey = ["admin", "budget"] as const;

async function fetchBudgetConfig(): Promise<BudgetConfig | null> {
  const { data } = await apiClient.get<BudgetApiResponse | { pricePerUnitVote?: number }>("/budget");

  if (data && "success" in data && data.success === false) {
    throw new Error(data.message ?? "Failed to load budget config");
  }

  const fromBudgetObject =
    typeof data === "object" && data !== null && "budget" in data
      ? Number(data.budget?.pricePerUnitVote)
      : NaN;

  const fromRoot =
    typeof data === "object" && data !== null && "pricePerUnitVote" in data
      ? Number(data.pricePerUnitVote)
      : NaN;

  const price = Number.isFinite(fromBudgetObject)
    ? fromBudgetObject
    : Number.isFinite(fromRoot)
      ? fromRoot
      : null;

  if (price === null) return null;
  return { pricePerUnitVote: price };
}

export function useGetBudgetConfig(
  options?: Omit<UseQueryOptions<BudgetConfig | null, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    ...options,
    queryKey: budgetConfigQueryKey,
    queryFn: fetchBudgetConfig,
  });
}

type SaveBudgetInput = {
  pricePerUnitVote: number;
  hasExistingConfig: boolean;
};

async function saveBudgetConfig(input: SaveBudgetInput): Promise<BudgetConfig> {
  const method = input.hasExistingConfig ? "put" : "post";
  const { data } = await apiClient.request<BudgetApiResponse>({
    method,
    url: "/budget",
    data: { pricePerUnitVote: input.pricePerUnitVote },
  });

  if (!data?.success) {
    throw new Error(data?.message ?? "Failed to save budget config");
  }

  const normalizedPrice = Number(
    data.budget?.pricePerUnitVote ?? data.pricePerUnitVote ?? input.pricePerUnitVote,
  );

  return {
    pricePerUnitVote: Number.isFinite(normalizedPrice)
      ? normalizedPrice
      : input.pricePerUnitVote,
  };
}

export function useSaveBudgetConfig(
  options?: Omit<UseMutationOptions<BudgetConfig, Error, SaveBudgetInput>, "mutationFn">,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: saveBudgetConfig,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: budgetConfigQueryKey });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
