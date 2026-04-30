"use client";

import { useState, useEffect } from "react";
import {
  IconChevronRight,
  IconFolder,
  IconFolderOpen,
  IconDots,
  IconPencil,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { FolderTreeResponse } from "@repo/schemas";
import { useRouter } from "next/navigation";

// ── Folder Tree Node ──────────────────────────────────────────────────────────

interface FolderNodeProps {
  folder: FolderTreeResponse;
  depth: number;
  activeId?: string;
  onCreate: (parentName?: string, parentId?: string) => void;
  onEdit: (parentName: string, parentId: string) => void;
  onDelete: (parentName: string, parentId: string) => void;
}

export function FolderNode({
  folder,
  depth,
  activeId,
  onCreate,
  onEdit,
  onDelete,
}: FolderNodeProps) {
  // Helper: recursively check if activeId is in this folder or any child
  function containsActive(
    folder: FolderTreeResponse,
    activeId?: string,
  ): boolean {
    if (!activeId) return false;
    if (folder.id === activeId) return true;
    return (
      folder.children?.some((child) => containsActive(child, activeId)) ?? false
    );
  }

  const isActive = activeId == folder.id;
  const shouldBeOpen = isActive || containsActive(folder, activeId);
  const [open, setOpen] = useState(shouldBeOpen);
  const router = useRouter();

  // Keep open state in sync with activeId changes
  useEffect(() => {
    setOpen(shouldBeOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBeOpen]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              "group flex rounded-none items-center gap-1.5 py-1.5 pr-2 cursor-pointer text-sm select-none transition-colors",
              isActive
                ? "bg-accent text-primary font-medium"
                : "hover:bg-accent",
            )}
            style={{ paddingLeft: `${8 + depth * 16}px` }}
            onClick={() => {
              router.push(`/folder/${folder.id}/test-cases`);
            }}
          >
            {/* Chevron toggle */}
            {folder.children.length > 0 ? (
              <CollapsibleTrigger asChild>
                <Button
                  variant="link"
                  size="icon-xs"
                  onClick={(e) => e.stopPropagation()}
                  className="px-0 w-3"
                >
                  <IconChevronRight
                    size={12}
                    className={cn(
                      "transition-transform",
                      open && "rotate-90",
                      "p-0",
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
            ) : (
              <span className="w-3 shrink-0" />
            )}

            {/* Icon */}
            {isActive && open ? (
              <IconFolderOpen size={15} className="shrink-0" />
            ) : depth === 0 ? (
              <IconFolder size={15} className="shrink-0" />
            ) : (
              <IconFolder size={14} className="shrink-0" />
            )}

            {/* Label */}
            <span className={`flex-1 ${depth === 0 ? "" : "text-xs"}`}>
              {folder.name[0]?.toUpperCase() + folder.name.slice(1)}
            </span>

            {/* Count badge */}
            <span className={cn("text-xs text-accent-foreground")}>
              {folder.children.length}
            </span>

            {/* Hover actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-zinc-200 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconDots size={13} className="text-zinc-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => onCreate(folder.name, folder.id)}
                >
                  <IconPlus size={13} className="mr-2" /> New Subfolder
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onEdit(folder.name, folder.id);
                  }}
                >
                  <IconPencil size={13} className="mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => onDelete(folder.name, folder.id)}
                >
                  <IconTrash size={13} className="mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ContextMenuTrigger>

        {/* Right-click context menu */}
        <ContextMenuContent className="w-44">
          <ContextMenuItem
            onClick={
              onCreate ? () => onCreate(folder.name, folder.id) : () => {}
            }
          >
            <IconPlus size={13} className="mr-2" /> New Subfolder
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              onEdit(folder.name, folder.id);
            }}
          >
            <IconPencil size={13} className="mr-2" /> Edit
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => onDelete(folder.name, folder.id)}
          >
            <IconTrash size={13} className="mr-2" /> Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {folder.children.length > 0 && (
        <CollapsibleContent>
          {folder.children.map((child) => (
            <FolderNode
              key={child.id}
              folder={child}
              depth={depth + 1}
              activeId={activeId}
              onCreate={onCreate}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
