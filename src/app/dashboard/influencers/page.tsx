import { InfluencersSVG } from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import InfluencersTable from "@/components/core/dashboard/influencers/influencers-table";
import {
  HeartUserSVG,
  InboxSVG,
  ShieldUserSVG,
} from "@/components/core/dashboard/svg";

const stats = [
  {
    title: "total influencers",
    value: "20",
    icon: InfluencersSVG,
    bgColor: "bg-[#E7F2FD]", // Light Blue
  },
  {
    title: "Pending approvals",
    value: "20",
    icon: InboxSVG,
    bgColor: "bg-[#FDF8E1]", // Light Lavender
  },
  {
    title: "Flagged for risk",
    value: "20",
    icon: ShieldUserSVG,
    bgColor: "bg-[#EEEFFC]", // Light Blue
  },
  {
    title: "Top performers",
    value: "20",
    icon: HeartUserSVG,
    bgColor: "bg-[#E5F7E8]", // Light Blue
  },
] as const;
const Influencers = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <InfluencersTable />
    </div>
  );
};

export default Influencers;
