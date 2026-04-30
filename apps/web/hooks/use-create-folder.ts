"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateFolder, FolderResponse } from "@repo/schemas";

import { createFolder } from "@/lib/api/folders";

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation<FolderResponse, Error, CreateFolder>({
    mutationFn: createFolder,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}
