"use client";

import {
  LoginErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
} from "@/app/types/auth";
import { useState, useCallback } from "react";

interface UseLoginReturn {
  login: (data: LoginRequest) => Promise<LoginSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (data: LoginRequest): Promise<LoginSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result: LoginSuccessResponse | LoginErrorResponse =
          await response.json();

        if (!response.ok) {
          // Handle error responses (400, 401, 500, etc.)
          const errorResponse = result as LoginErrorResponse;
          const errorMessage =
            errorResponse.message || "Login failed. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // Success response (200)
        const successResponse = result as LoginSuccessResponse;
        setIsLoading(false);
        return successResponse;
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Error) {
          setError(err.message);
          throw err;
        }
        const errorMessage = "An unexpected error occurred. Please try again.";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [],
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    isLoading,
    error,
    resetError,
  };
}
