import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateFolder } from "@/hooks/use-create-folder";

type CreateFolderProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderTarget: { name: string; id: string } | null;
};

export function CreateFolder({
  open,
  onOpenChange,
  folderTarget,
}: CreateFolderProps) {
  const [newFolderName, setNewFolderName] = useState("");

  const { mutate, isPending } = useCreateFolder();

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    mutate(
      { name: newFolderName, parentId: folderTarget?.id },
      {
        onSuccess: () => {
          toast.success("Folder created successfully");
          setNewFolderName("");
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create folder");
        },
      },
    );
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {folderTarget?.id
              ? `New subfolder in "${folderTarget?.name}"`
              : "New root folder"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          required
          placeholder="Folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
        />
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} disabled={isPending}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
