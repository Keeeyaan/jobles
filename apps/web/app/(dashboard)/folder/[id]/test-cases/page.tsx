"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FolderTreeResponse } from "@repo/schemas";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FolderNode } from "@/components/folder-node";
import { CreateFolder } from "@/components/form/create-folder";
import { EditFolder } from "@/components/form/edit-folder";
import { DeleteFolder } from "@/components/form/delete-folder";

import { useFolderTree } from "@/hooks/use-folder-tree";
import { Loader2Icon } from "lucide-react";

export default function TestCasesPage() {
  const params = useParams();
  const router = useRouter();

  const { data: folders, isLoading } = useFolderTree();

  const findFolderRecursive = (
    folderList: FolderTreeResponse[],
    targetId: string,
  ): FolderTreeResponse | null => {
    if (!folderList) return null;

    for (const folder of folderList) {
      if (String(folder.id) === String(targetId)) {
        return folder;
      }
      // Assume subfolders are in a 'children' or 'subfolders' property
      if (folder.children) {
        const found = findFolderRecursive(folder.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  if (!isLoading && folders && folders.length > 0) {
    // Use the recursive function to check for existence anywhere in the tree
    const folderExists = findFolderRecursive(folders, String(params.id));

    if (!folderExists) {
      router.replace("/not-found");
    }
  }

  // New folder dialog
  const [openNewFolder, setOpenNewFolder] = useState(false);

  // Edit folder dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Delete folder confirm dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // ── Folder operations ──
  const [folderTarget, setFolderTarget] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const onCreateFolder = (parentName?: string, parentId?: string) => {
    if (parentName && parentId) {
      setFolderTarget({ id: parentId, name: parentName });
    }
    setOpenNewFolder(true);
  };

  const onEditFolder = (parentName: string, parentId: string) => {
    setFolderTarget({ id: parentId, name: parentName });
    setOpenEditDialog(true);
  };

  const onDeleteFolder = (parentName: string, parentId: string) => {
    setFolderTarget({ id: parentId, name: parentName });
    setOpenDeleteDialog(true);
  };

  return (
    <div className="w-full h-full">
      <ResizablePanelGroup className="h-full w-full">
        <ResizablePanel defaultSize="25%">
          {/* ── Left: Folder Tree ── */}
          <div className="w-full h-full flex flex-col ">
            {/* Folder Filter??*/}
            <p className="px-2 py-3 border-b text-xs font-semibold uppercase tracking-widest">
              Folders
            </p>

            {/* Folder tree */}
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-full">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              folders!.map((folder) => (
                <FolderNode
                  key={folder.id}
                  folder={folder}
                  depth={0}
                  // testCases={testCases}
                  activeId={params.id?.toString()}
                  onCreate={onCreateFolder}
                  onEdit={onEditFolder}
                  onDelete={onDeleteFolder}
                />
              ))
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          {/* ── Right: Table ── */}
          {/* <div className="flex-1 overflow-auto">
            {visibleTestCases.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-sm">
                <IconFolder size={32} />
                <p>No test cases found</p>
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10 border-b">
                  <tr>
                    <th className="w-9 px-3 py-2.5">
                      <Checkbox />
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Folder
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {visibleTestCases.map((tc) => {
                    const folderLabel =
                      folders.find((f) => f.id === tc.folderId)?.label ?? "—";
                    return (
                      <tr
                        key={tc.id}
                        className="border-b last:border-0 hover:bg-accent group cursor-pointer"
                      >
                        <td className="px-3 py-2.5">
                          <Checkbox />
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="font-mono text-xs font-semibold text-primary">
                            {tc.id}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 max-w-[260px]">
                          <p className="truncate ">{tc.title}</p>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-xs">
                          {folderLabel}
                        </td>
                        <td className="px-3 py-2.5">
                          <PriorityLabel priority={tc.priority} />
                        </td>
                        <td className="px-3 py-2.5">
                          <StatusBadge status={tc.status} />
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1 flex-wrap">
                            {tc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] px-1.5 py-0.5 rounded border bg-muted text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs whitespace-nowrap">
                          {tc.updatedAt}
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs px-2"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs px-2"
                            >
                              Run
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div> */}
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* ── New Folder Dialog Form ── */}
      <CreateFolder
        open={openNewFolder}
        onOpenChange={(open) => {
          setOpenNewFolder(open);
          if (!open) {
            return setFolderTarget(null);
          }
        }}
        folderTarget={folderTarget}
      />

      {/* ── Edit Folder Dialog Form ── */}
      <EditFolder
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        folderTarget={folderTarget}
      />

      {/* ── Delete Folder Dialog Form ── */}
      <DeleteFolder
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        folderTarget={folderTarget}
      />
    </div>
  );
}
