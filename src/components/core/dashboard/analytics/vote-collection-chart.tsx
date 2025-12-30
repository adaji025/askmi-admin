"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", votes: 42 },
  { month: "Feb", votes: 58 },
  { month: "Mar", votes: 85 },
  { month: "Apr", votes: 95 },
  { month: "May", votes: 72 },
  { month: "Jun", votes: 50 },
  { month: "Jul", votes: 68 },
  { month: "Aug", votes: 98 },
  { month: "Sep", votes: 115 },
  { month: "Oct", votes: 82, marked: true },
  { month: "Nov", votes: 105 },
  { month: "Dec", votes: 128 },
];

const chartConfig = {
  votes: {
    label: "Votes",
    color: "#9333EA", // Purple color
  },
} satisfies ChartConfig;

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.marked) {
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

export function VoteCollectionChart() {
  return (
    <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6">
      <h3 className="text-xl font-bold mb-6">Vote Collection Over Time</h3>
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
            tickFormatter={(value) => `${value}k`}
            domain={[0, 140]}
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
