"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import LanguageDropdown from "../dashboard/dashboard/layout/lang-dropdown";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLogin } from "@/features/auth/use-login";
import { useUserStore } from "@/store/user-store";

export function LoginForm() {
  const t = useTranslations("auth.signIn");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login, isLoading, error: apiError, resetError } = useLogin();
  const { login: setUserLogin } = useUserStore();

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return t("emailRequired");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return t("emailInvalid");
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return t("passwordRequired");
    }
    if (password.length < 6) {
      return t("passwordMinLength");
    }
    return "";
  };

  const validateForm = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetError();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      // Store user data and token in the store
      setUserLogin(response.user, response.token);

      // Navigate to dashboard after successful login
      router.push("/dashboard");
    } catch {
      // apiError from useLogin is shown in the form
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setFormData({ ...formData, email: e.target.value });
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setFormData({ ...formData, password: e.target.value });
    if (errors.password) {
      setErrors({ ...errors, password: "" });
    }
  };

  return (
    <div className="relative py-10 px-6 lg:px-8">
      <Image
        src={"/images/svgs/auth-ellipse.svg"}
        height={338}
        width={264}
        alt="askmi"
        className="absolute left-0 -bottom-14 hidden lg:block"
      />
      <div className="flex justify-end mb-6">
        <LanguageDropdown />
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <Image
            src={"/images/svgs/logo-admin.svg"}
            height={72}
            width={94}
            alt="askmi"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {apiError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {apiError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-bold text-[#8E8E8E]">
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={handleEmailChange}
              className={`h-11 rounded-[6px] text-white ${errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
                }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-bold text-[#8E8E8E]"
            >
              {t("password")}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={formData.password}
              onChange={handlePasswordChange}
              className={`h-11  rounded-[6px] text-white ${errors.password
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
                }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-8 rounded-[6px] w-full h-12 text-base font-medium bg-[#2563EB] hover:bg-[#2563EB]/90"
            disabled={isLoading}
          >
            {isLoading ? t("signingIn") : t("signInButton")}
          </Button>
        </form>
      </div>
    </div>
  );
}
