import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ActiveInfluencerCard from "../influencers/active-influencer-card";

export default function CampaignDetail() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
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

      {/* Active Influencers */}
      <ActiveInfluencerCard />

      {/* Survey Questions */}
      <div className="space-y-10 bg-white p-4 lg:p-6 rounded-md">
        <h2 className="text-lg font-bold text-black">Survey Questions</h2>

        {/* Question 1 */}
        <div className="space-y-4">
          <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
            Question 1 of 2
          </div>
          <h3 className="text-lg font-bold text-black">
            What is your age group?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["18-24", "25-34", "35-44", "45+"].map((age) => (
              <div
                key={age}
                className="p-4 rounded-lg border border-[#E2E8F0] bg-gray-[#FAFAFA] text-center font-medium text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {age}
              </div>
            ))}
          </div>
        </div>

        {/* Question 2 */}
        <div className="space-y-4">
          <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
            Question 2 of 2
          </div>
          <h3 className="text-lg font-bold text-black">
            How satisfied are you with our product?
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className="flex items-center justify-center rounded-lg border border-[#E2E8F0] py-2.5 bg-white text-center font-medium text-sm text-gray-700 hover:border-indigo-100 hover:bg-indigo-50/30 cursor-pointer transition-all"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
