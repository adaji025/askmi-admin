"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageDropdown from "../dashboard/dashboard/layout/lang-dropdown";
import InfluenceDirections from "./influencer-directions";
import { PhoneInput } from "./phone-number-input";
import { useTranslations } from "next-intl";





export function RegisterForm() {
  const t = useTranslations("auth.signUp");
  const [accountType, setAccountType] = useState<"brand" | "influencer">(
    "brand"
  );
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    company: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateFullName = (fullName: string): string => {
    if (!fullName.trim()) {
      return t("fullNameRequired");
    }
    if (fullName.trim().length < 2) {
      return t("fullNameMinLength");
    }
    return "";
  };

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
    if (password.length < 8) {
      return t("passwordMinLength");
    }
    return "";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string => {
    if (!confirmPassword) {
      return t("confirmPasswordRequired");
    }
    if (confirmPassword !== password) {
      return t("passwordsMismatch");
    }
    return "";
  };

  const validatePhoneNumber = (phoneNumber: string): string => {
    if (!phoneNumber.trim()) {
      return t("phoneRequired");
    }
    // Basic validation - at least 7 digits
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      return t("phoneInvalid");
    }
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      return t("phoneMinLength");
    }
    return "";
  };

  const validateForm = (): boolean => {
    const fullNameError = validateFullName(formData.fullName);
    const companyError = formData.company.trim()
      ? ""
      : t("companyRequired");
    const emailError = validateEmail(formData.email);
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    setErrors({
      fullName: fullNameError,
      company: companyError,
      email: emailError,
      phoneNumber: phoneNumberError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return (
      !fullNameError &&
      !companyError &&
      !emailError &&
      !phoneNumberError &&
      !passwordError &&
      !confirmPasswordError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual registration API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", { accountType, ...formData });
      router.push("/dashboard");
      // Navigate to login or dashboard after successful registration
    } catch (err) {
      setError(t("registrationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing (only for fields that have errors)
    if (field !== "countryCode" && errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field as keyof typeof errors]: "" });
    }
    // Clear confirm password error if password changes
    if (field === "password" && errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <LanguageDropdown />
      </div>
      <div className="w-full ">
        <div className="text-center mb-8 max-w-md mx-auto">
          <h1 className="text-[32px] text-center font-bold mb-2 text-blck">
            {t("title")}
          </h1>
          <p className="text-base text-center text-[#5D6A6B]">
            {t("subtitle")}
          </p>
        </div>

        {/* Account Type Toggle */}
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-8 border rounded-lg p-0.5 ">
            <button
              onClick={() => setAccountType("brand")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                accountType === "brand"
                  ? "bg-white text-foreground border border-[#E2E8F0]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("asBrand")}
            </button>
            <button
              onClick={() => setAccountType("influencer")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                accountType === "influencer"
                  ? "bg-white text-foreground border border-[#E2E8F0]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("asInfluencer")}
            </button>
          </div>
        </div>

        {/* Form */}
        {accountType === "brand" && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  {t("fullName")}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t("fullNamePlaceholder")}
                  value={formData.fullName}
                  onChange={(e) =>
                    handleFieldChange("fullName", e.target.value)
                  }
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.fullName
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  {t("company")}
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder={t("companyPlaceholder")}
                  value={formData.company}
                  onChange={(e) => handleFieldChange("company", e.target.value)}
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.company
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.company && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  {t("workEmail")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  {t("phoneNumber")}
                </Label>
                <PhoneInput
                  value={formData.phoneNumber}
                  onChange={(value) => handleFieldChange("phoneNumber", value)}
                  countryCode={formData.countryCode}
                  onCountryCodeChange={(code) =>
                    setFormData({ ...formData, countryCode: code })
                  }
                  placeholder={t("phonePlaceholder")}
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.phoneNumber
                      ? "border-destructive focus-within:ring-destructive"
                      : ""
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.phoneNumber}
                  </p>
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
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.password
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  {t("confirmPassword")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleFieldChange("confirmPassword", e.target.value)
                  }
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.confirmPassword
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-12 rounded-[6px] w-full h-12 text-base font-medium bg-[#2563EB] hover:bg-[#2563EB]/90"
                disabled={isLoading}
              >
                {isLoading ? t("creatingAccount") : t("createAccount")}
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              {t("hasAccount")}{" "}
              <Link
                href={"/auth/sign-in"}
                className="text-[#8B5CF6] font-medium cursor-pointer hover:underline"
              >
                {t("signIn")}
              </Link>
            </p>
          </div>
        )}

        {accountType === "influencer" && <InfluenceDirections />}
      </div>
    </div>
  );
}
