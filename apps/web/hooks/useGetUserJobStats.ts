import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";

type JobStats = {
  total: number;
  pending: number;
  applied: number;
  interviewed: number;
  offered: number;
  accepted: number;
  rejected: number;
};

export function useJobStats() {
  return useQuery({
    queryKey: ["job-stats"],
    queryFn: () => apiFetch<JobStats>("/jobs/stats"),
  });
}
