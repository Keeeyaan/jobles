import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeleteFolder } from "@/hooks/use-delete-folder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type NewFolderFormProps = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  folderTarget: { name: string; id: string } | null;
};

export function DeleteFolder({
  openDeleteDialog,
  setOpenDeleteDialog,
  folderTarget,
}: NewFolderFormProps) {
  const { mutate, isPending } = useDeleteFolder();
  const router = useRouter();
  const handleDelete = () => {
    mutate(
      { id: folderTarget!.id },
      {
        onSuccess: () => {
          toast.success("Folder deleted successfully");
          router.replace("/folder");
          setOpenDeleteDialog(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete folder");
        },
      },
    );
  };

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete "{folderTarget?.name}"?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <p className="text-sm text-zinc-500">
          This will also delete all subfolders. Test cases inside will not be
          deleted but will become unassigned.
        </p>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
