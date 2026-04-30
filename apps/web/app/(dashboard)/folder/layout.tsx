"use client";

import { useState } from "react";
import { IconFilter, IconFolderPlus } from "@tabler/icons-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/search-filter";
import { CreateFolder } from "@/components/form/create-folder";
import { GenerateCasesForm } from "@/components/form/generate-cases-form";

export default function FolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Card className="ring-0 rounded-none gap-0 h-full">
      {/* Header */}
      <CardHeader className="flex justify-between items-center mb-4">
        <div>
          <CardTitle className="text-2xl font-bold">Test Cases</CardTitle>
          <CardDescription>
            View and manage your generated test cases here.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Create Test Case</Button>
          <GenerateCasesForm />
        </div>
      </CardHeader>

      {/* Toolbar */}
      <div className="flex justify-between px-4 py-3 bg-muted border-y">
        <Button
          variant="outline"
          onClick={() => {
            setOpenNewFolder(true);
          }}
        >
          <IconFolderPlus />
        </Button>
        <div className="flex items-center gap-2">
          <SearchFilter
            className="min-w-80"
            placeHolder="Search by Test Case Id or Title"
            search={search}
            setSearch={setSearch}
          />
          <Button variant="outline" size="icon">
            <IconFilter />
          </Button>
        </div>
      </div>

      <CreateFolder
        open={openNewFolder}
        onOpenChange={setOpenNewFolder}
        folderTarget={null}
      />

      {/* Folders & Test Cases */}
      <div className="h-full">{children}</div>
    </Card>
  );
}
