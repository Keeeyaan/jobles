"use client";

import { useState } from "react";
import { IconBotId, IconCaretUpDown, IconFilter } from "@tabler/icons-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/search-filter";

export default function TestRunsPage() {
  const [search, setSearch] = useState("");
  return (
    <>
      {/* Header */}
      <Card className="ring-0 rounded-none gap-0 overflow-hidden">
        <CardHeader className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Test Runs</CardTitle>
            <CardDescription>View and manage your test runs.</CardDescription>
          </div>
          <Button variant="outline">Create Manual Run</Button>
        </CardHeader>

        {/* Toolbar */}
        <div className="flex justify-between px-4 py-3 bg-muted border-y">
          <Button variant="outline">
            All Runs
            <IconCaretUpDown />
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
      </Card>
    </>
  );
}
