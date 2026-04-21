"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "@/lib/api/jobs";
import type { CreateJob, JobResponse } from "@repo/schemas";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation<JobResponse, Error, CreateJob>({
    mutationFn: createJob,

    onSuccess: () => {
      // 🔥 refetch jobs list automatically
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
