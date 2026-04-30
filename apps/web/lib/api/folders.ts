import {
  CreateFolder,
  FolderResponse,
  FolderTreeResponse,
  RenameFolder,
} from "@repo/schemas";

import { apiFetch } from "../fetcher";

export async function createFolder(data: CreateFolder) {
  return await apiFetch<FolderResponse>("/folders", {
    method: "POST",
    body: data,
  });
}

export async function getFolderTree() {
  const data = await apiFetch<FolderTreeResponse[]>("/folders/tree", {
    method: "GET",
  });

  const convertDates = (folder: any): any => ({
    ...folder,
    createdAt: new Date(folder.createdAt),
    updatedAt: new Date(folder.updatedAt),
    children: folder.children?.map(convertDates) ?? [],
  });

  return data.map(convertDates);
}

export async function renameFolder({
  id,
  data,
}: {
  id: string;
  data: RenameFolder;
}) {
  return await apiFetch<FolderResponse>(`/folders/${id}/rename`, {
    method: "PATCH",
    body: data,
  });
}

export async function deleteFolder({ id }: { id: string }) {
  return await apiFetch<FolderResponse>(`/folders/${id}`, {
    method: "DELETE",
  });
}
