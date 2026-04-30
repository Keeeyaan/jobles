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

import { useRenameFolder } from "@/hooks/use-rename-folder";

type EditFolderFormProps = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  folderTarget: { name: string; id: string } | null;
};

export function EditFolder({
  openEditDialog,
  setOpenEditDialog,
  folderTarget,
}: EditFolderFormProps) {
  const [newFolderName, setNewFolderName] = useState("");

  const { mutate, isPending } = useRenameFolder();

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    mutate(
      { id: folderTarget!.id, data: { name: newFolderName } },
      {
        onSuccess: () => {
          toast.success("Folder edited successfully");
          setNewFolderName("");
          setOpenEditDialog(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to edit folder");
        },
      },
    );
  };

  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update "{folderTarget?.name}"</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          required
          defaultValue={folderTarget?.name}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
        />
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setOpenEditDialog(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} disabled={isPending}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
