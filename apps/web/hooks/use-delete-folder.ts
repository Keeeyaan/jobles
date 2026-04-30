"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FolderResponse } from "@repo/schemas";

import { deleteFolder } from "@/lib/api/folders";

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation<FolderResponse, Error, { id: string }>({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}
