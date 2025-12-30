import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType;
  trend?: string;
  trendType?: "up" | "down";
  bgColor: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  bgColor,
}: StatCardProps) {
  const isUp = trendType === "up";

  return (
    <div
      className={cn(
        "flex flex-col justify-between p-4 rounded-md h-full min-h-28",
        bgColor
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-slate-900">{title}</h3>
        {Icon && <Icon />}
      </div>

      <div className="flex justify-between items-end">
        <span className="text-2xl font-semibold tracking-tight text-slate-900">
          {value}
        </span>
        <div
          className={cn(
            "flex text-xs items-center gap-1 font-medium",
            isUp ? "text-emerald-500" : "text-rose-500"
          )}
        >
          <span>{trend}</span>
          {trend &&
            (isUp ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            ))}
        </div>
      </div>
    </div>
  );
}
