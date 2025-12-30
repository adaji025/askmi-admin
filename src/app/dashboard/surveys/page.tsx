"use client";

import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SurveyCard from "@/components/core/dashboard/survey/survey-card";
import Link from "next/link";

interface Survey {
  id: string;
  title: string;
  status: "published" | "draft";
  daysAgo: number;
  questionsCount: number;
}

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Product Feedback Survey",
    status: "published",
    daysAgo: 3,
    questionsCount: 5,
  },
  {
    id: "2",
    title: "Product Feedback Survey",
    status: "draft",
    daysAgo: 3,
    questionsCount: 5,
  },
];

export default function Surveys() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search survey..."
            className="pl-9 h-11 bg-white rounded-md"
          />
        </div>
        <Link href={"/create-survey"}>
          <Button className="h-11 px-6 cursor-pointer bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-md">
            <Plus className="h-5 w-5" />
            New survey
          </Button>
        </Link>
      </div>

      {/* Survey Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Published and Draft Survey Cards */}
        {mockSurveys.map((survey) => (
          <SurveyCard
            key={survey.id}
            title={survey.title}
            status={survey.status}
            daysAgo={survey.daysAgo}
            questionsCount={survey.questionsCount}
          />
        ))}

        {/* New Survey Card */}
        <Card className="bg-[#F0F4F8] rounded-md border border-[#E2E8F0] shadow-none cursor-pointer hover:bg-[#E8F0F5] transition-colors">
          <CardContent className="p-4 flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#2563EB] flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
