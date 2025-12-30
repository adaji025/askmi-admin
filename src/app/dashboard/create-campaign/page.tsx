"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { CampaignSetup } from "@/components/core/dashboard/create-campaign/setup";
import BudgetAndTimeline from "@/components/core/dashboard/create-campaign/budget-and-timeline";
import Review from "@/components/core/dashboard/create-campaign/review";

const CreateCampaign = () => {
  const [active, setActive] = React.useState<
    "Campaign Setup" | "Budget & Timeline" | "Review"
  >("Campaign Setup");
  const steps = ["Campaign Setup", "Budget & Timeline", "Review"];
  const router = useRouter();

  const handleNext = (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => {
    setActive(value);
  };
  return (
    <div className="max-w-250 w-full mx-auto px-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-sm font-semibold"
            >
              <div
                className={`h-4 w-4 text-[10px] text-white rounded-full flex justify-center items-center ${
                  active === step ? "bg-[#8B5CF6]" : "bg-[#8A97A0]"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`${
                  active === step ? "text-black" : "text-[#8A97A0]"
                }`}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-sm shadow-none rounded-sm font-semibold bg-transparent py-3.5 border border-[#EBEBEB]"
        >
          <span className="hidden sm:inline">Cancel</span>
        </Button>
      </div>

      <div className="mt-10">
        {active === "Campaign Setup" && (
          <CampaignSetup handleNext={handleNext} />
        )}
        {active === "Budget & Timeline" && (
          <BudgetAndTimeline handleNext={handleNext} />
        )}
        {active === "Review" && <Review />}
      </div>
    </div>
  );
};

export default CreateCampaign;
