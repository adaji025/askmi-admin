"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useTranslations } from "next-intl";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { VoteCollectionOverTimeItem } from "@/features/dashboard/use-get-dashboard-stats";

interface VoteDeliveryChartProps {
  data: VoteCollectionOverTimeItem[];
}

interface ChartPoint {
  month: string;
  votes: number;
  marked?: boolean;
}

const CustomDot = (props: { cx?: number; cy?: number; payload?: ChartPoint }) => {
  const { cx, cy, payload } = props;
  if (payload?.marked) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#9333EA"
        stroke="#fff"
        strokeWidth={2}
      />
    );
  }
  return null;
};

export function VoteDeliveryChart({ data }: VoteDeliveryChartProps) {
  const t = useTranslations("dashboard.charts");

  const chartData: ChartPoint[] = data.map((item, index) => ({
    month: item.month,
    votes: item.voteCount,
    marked: index === data.length - 1,
  }));

  const maxVotes = Math.max(...chartData.map((item) => item.votes), 0);

  const chartConfig = {
    votes: {
      label: t("votes"),
      color: "#9333EA", // Purple color
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6">
      <h3 className="text-xl font-bold mb-6">{t("voteCollectionOverTime")}</h3>
      <ChartContainer config={chartConfig} className="h-80 w-full">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
            domain={[0, Math.max(Math.ceil(maxVotes * 1.15), 10)]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            type="monotone"
            dataKey="votes"
            stroke="#9333EA"
            strokeWidth={2}
            fill="url(#colorVotes)"
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: "#9333EA", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
