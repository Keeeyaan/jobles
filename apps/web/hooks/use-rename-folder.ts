"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RenameFolder, FolderResponse } from "@repo/schemas";

import { renameFolder } from "@/lib/api/folders";

export function useRenameFolder() {
  const queryClient = useQueryClient();

  return useMutation<FolderResponse, Error, { id: string; data: RenameFolder }>(
    {
      mutationFn: renameFolder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folders"] });
      },
    },
  );
}
