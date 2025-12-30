"use client";
import React from "react";
import Campaign from "../campaign";
import Security from "../security";
import { ProfileSettings } from "../profile-settings";

export const SettingsComp = () => {
  const [settingsType, setSettingsType] = React.useState<
    "My Profile" | "Security" | "Campaigns Settings"
  >("My Profile");
  const settingsOptions: ("My Profile" | "Security" | "Campaigns Settings")[] = [
    "My Profile",
    "Security",
    "Campaigns Settings",
  ];
  return (
    <div>
      <div className="flex gap-2 mb-8  border rounded-lg p-0.5 ">
        {settingsOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => setSettingsType(option)}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
              settingsType === option
                ? "bg-white text-foreground border border-[#E2E8F0]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {settingsType === "My Profile" && <ProfileSettings />}
        {settingsType === "Security" && <Security />}
        {settingsType === "Campaigns Settings" && <Campaign />}
      </div>
    </div>
  );
};
