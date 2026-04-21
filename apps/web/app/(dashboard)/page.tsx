"use client";

import { Stats } from "@/components/stats";
import { useUserJobStats } from "@/hooks/use-user-job-stats";

export default function DashboardPage() {
  const { data: stats, isLoading, isFetching } = useUserJobStats();

  return (
    <div className="p-8 space-y-6">
      {/* Stats */}
      <Stats stats={stats} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}
