// hooks/useUserJobs.ts

import { useQuery } from "@tanstack/react-query";
import { getUserJobs } from "@/lib/api/jobs";

export function useUserJobs() {
  return useQuery({
    queryKey: ["jobs"], // important for caching
    queryFn: getUserJobs,
  });
}
