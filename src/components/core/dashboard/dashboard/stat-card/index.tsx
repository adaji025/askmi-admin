import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreakdownItem {
  label: string;
  value: string | number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType;
  trend?: string;
  trendType?: "up" | "down";
  bgColor: string;
  breakdown?: BreakdownItem[];
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  bgColor,
  breakdown,
}: StatCardProps) {
  const isUp = trendType === "up";

  return (
    <div
      className={cn(
        "flex flex-col justify-between p-5 rounded-lg h-full min-h-32",
        bgColor
      )}
    >
      {/* Top section: Icon on left, Trend on right */}
      <div className="flex justify-between items-start mb-3">
        {Icon && (
          <div className="shrink-0">
            <Icon />
          </div>
        )}
        {trend && (
          <div
            className={cn(
              "flex text-sm items-center gap-1 font-medium",
              isUp ? "text-green-600" : "text-rose-500"
            )}
          >
            <span>{trend}</span>
            {isUp ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
          </div>
        )}
      </div>

      {/* Title below icon */}
      <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>

      {/* Large main value */}
      <span className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
        {value}
      </span>

      {/* Breakdown section at bottom */}
      {breakdown && breakdown.length > 0 && (
        <div className="flex items-center gap-0.5 text-[10px] text-slate-700">
          {breakdown.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>
                {item.value} {item.label}
              </span>
              {index < breakdown.length - 1 && (
                <span className="text-slate-400">•</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
