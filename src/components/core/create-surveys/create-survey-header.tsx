"use client";

import { ArrowLeft, CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateSurveyHeader = () => {
  const router = useRouter();

  return (
    <header className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
      {/* Left Section - Back Button */}
      <div className="lg:w-[38%]">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-black h-10 px-4"
        >
          <ArrowLeft className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Back to Survey</span>
        </Button>
      </div>

      {/* Center Section - Logo */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="relative">
          <Image src={"/askmi-1.svg"} height={40} width={48} alt="logo" />
        </div>
      </div>

      {/* Right Section - Autosave, Preview, Publish */}
      <div className="flex items-center gap-4">
        {/* Autosave Status */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-[10px] md:text-sm text-gray-400">
            Autosave is on...
          </span>
        </div>

        {/* Preview Button */}
        <Button
          variant="outline"
          className="bg-gray-700 border-gray-600 rounded-md shadow-sm hover:bg-gray-600 text-white h-10 px-4"
        >
          <Eye className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Preview</span>
        </Button>

        {/* Publish Survey Button */}
        <Button
          variant="outline"
          className="text-sm bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-[#2563EB] h-10 px-4"
        >
          <CheckCircle2 className="h-4 w-4 ms:mr-2 text-[#2563EB]" />
          Publish <span className="hidden md:inline">Survey</span>
        </Button>
      </div>
    </header>
  );
};

export default CreateSurveyHeader;
