import { useQuery } from "@tanstack/react-query";

import { getFolderTree } from "@/lib/api/folders";

export function useFolderTree() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: getFolderTree,
  });
}
