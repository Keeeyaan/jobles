import { z } from "zod";

export const FolderSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required"),
  parentId: z.uuid().nullable().optional(),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean().default(false),
});

export type Folder = z.infer<typeof FolderSchema>;

export const CreateFolderSchema = FolderSchema.omit({
  id: true,
  isDeleted: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateFolder = z.infer<typeof CreateFolderSchema>;

export const RenameFolderSchema = CreateFolderSchema.omit({
  parentId: true,
}).partial();

export type RenameFolder = z.infer<typeof RenameFolderSchema>;

export const DeleteFolderSchema = z.object({
  moveTestCasesTo: z.string().optional(),
});

export type DeleteFolder = z.infer<typeof DeleteFolderSchema>;

export const FolderResponseSchema = FolderSchema.extend({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type FolderResponse = z.infer<typeof FolderResponseSchema>;

export const FolderTreeResponseSchema = FolderResponseSchema.extend({
  children: z.array(z.lazy(() => FolderTreeResponseSchema)).default([]),
});

export type FolderTreeResponse = z.infer<typeof FolderTreeResponseSchema>;
