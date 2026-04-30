"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconFiles, IconFolderPlus } from "@tabler/icons-react";

import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateFolder } from "@/components/form/create-folder";

import { useFolderTree } from "@/hooks/use-folder-tree";
import { Loader2Icon } from "lucide-react";

export default function FolderPage() {
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const router = useRouter();

  const { data: folders, isLoading } = useFolderTree();

  useEffect(() => {
    // Redirect only when loading finished and folders exist
    if (!isLoading && folders && folders.length > 0) {
      router.replace(`/folder/${folders[0].id}/test-cases`);
    }
  }, [isLoading, folders, router]);

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup className="h-full w-full">
        <ResizablePanel defaultSize="25%">
          <div className="flex gap-3 flex-col h-full items-center justify-center p-6">
            {isLoading || (folders && folders.length > 0) ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <IconFolderPlus size={40} />
                <p className="font-semibold flex flex-col text-center">
                  Add Folders
                  <span className="text-muted-foreground font-normal">
                    You can organize test cases in folders. Get started now.
                  </span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => setOpenNewFolder(true)}
                >
                  Create Folder
                </Button>
              </>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div className="flex gap-3 flex-col h-full items-center justify-center p-6">
            {isLoading || (folders && folders.length > 0) ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <IconFiles size={40} />
                <p className="font-semibold flex flex-col text-center">
                  Add Test Cases
                  <span className="text-muted-foreground font-normal">
                    You can create test cases by entering the details below.
                  </span>
                </p>
                <div className="flex items-center">
                  <Input
                    placeholder="Enter test case title"
                    className="rounded-r-none w-md"
                  />
                  <Button
                    className="border-l-none rounded-l-none"
                    variant="outline"
                  >
                    Create
                  </Button>
                </div>
              </>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <CreateFolder
        open={openNewFolder}
        onOpenChange={setOpenNewFolder}
        folderTarget={null}
      />
    </div>
  );
}
