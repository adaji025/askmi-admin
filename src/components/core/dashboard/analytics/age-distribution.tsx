import { Progress } from "@/components/ui/progress";

const ageData = [
  { range: "18 - 24", percentage: 42 },
  { range: "25 - 34", percentage: 35 },
  { range: "35 - 44", percentage: 15 },
  { range: "45 and above", percentage: 8 },
];

export function AgeDistribution() {
  return (
    <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
      <h3 className="text-lg font-bold">Age Distribution</h3>
      <div className="space-y-4">
        {ageData.map((item) => (
          <div key={item.range} className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{item.range}</span>
              <span>{item.percentage}%</span>
            </div>
            <Progress
              value={item.percentage}
              className="h-2 bg-slate-100"
              // Customizing indicator color to match purple in image
              // Using a style override since Progress uses a fixed bg-primary class internally
              style={{
                ["--progress-indicator-bg" as any]: "#8B5CF6", // Violet-500
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
