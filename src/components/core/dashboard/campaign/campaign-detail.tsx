"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CampaignDetail() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <Badge
          variant="outline"
          className="bg-[#4AC3600D] rounded text-[#4AC360] border-[#4AC36026] font-medium px-2 py-1 uppercase text-[10px] tracking-wider"
        >
          Active Campaign
        </Badge>
        <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-blck">
          Product Feedback Survey
        </h1>
        <p className="text-[#8A97A0] max-w-3xl leading-relaxed">
          Collecting valuable customer insights about product features,
          usability, and satisfaction levels across our target demographic
          through Instagram Stories.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-emerald-100 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-emerald-950">78%</div>
            <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest mt-4">
              Complete
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-indigo-950">500</div>
            <div className="text-[10px] font-semibold text-indigo-800 uppercase tracking-widest mt-4">
              Responses
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-950">4</div>
            <div className="text-[10px] font-semibold text-blue-800 uppercase tracking-widest mt-4">
              Influencers
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-950">7 days</div>
            <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-widest mt-4">
              Left
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Progress */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-black">Response Progress</h2>
          <div className="text-3xl font-bold">
            500 <span className="text-gray-400 font-bold text-lg">/ 1,000</span>
          </div>
        </div>
        <Progress value={50} className="h-4 bg-gray-100" />
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#E5F7E8] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              COMPLETE
            </div>
            <div className="text-2xl font-bold text-foreground">78%</div>
          </CardContent>
        </Card>
        <Card className="bg-[#E7F2FD] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              INFLUENCERS
            </div>
            <div className="text-2xl font-bold text-foreground">4</div>
          </CardContent>
        </Card>
        <Card className="bg-[#FDF8E1] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              LEFT
            </div>
            <div className="text-2xl font-bold text-foreground">7 days</div>
          </CardContent>
        </Card>
        <Card className="bg-[#E7F2FD] border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
              OCR QUALITY
            </div>
            <div className="text-2xl font-bold text-foreground">89.2%</div>
          </CardContent>
        </Card>
      </div>

      {/* Influencer Performance */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] space-y-4">
        <h2 className="text-lg font-bold text-foreground p-5">
          Influencer Performance
        </h2>
        <div className="space-y-4">
          {[
            {
              name: "Sarah Johnson",
              handle: "@sarah_lifestyle",
              responses: 342,
            },
            {
              name: "Sarah Johnson",
              handle: "@sarah_lifestyle",
              responses: 380,
            },
            {
              name: "Sarah Johnson",
              handle: "@sarah_lifestyle",
              responses: 208,
            },
            {
              name: "Sarah Johnson",
              handle: "@sarah_lifestyle",
              responses: 218,
            },
          ].map((influencer, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between md:items-center  border-b gap-4 p-4 hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex">
                <Avatar className="h-12 w-12 bg-[#8B5CF6]">
                  <AvatarFallback className="bg-[#8B5CF6] text-white text-sm font-bold">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-bold text-foreground">
                    {influencer.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {influencer.handle}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span className="text-sm font-medium text-foreground">
                  {influencer.responses} responses
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
